// Quiz Results CSV Export — Multi-quiz support
import { NextRequest, NextResponse } from 'next/server';
import { kvGet } from '../../../../lib/kv-store';

export const dynamic = 'force-dynamic';

interface QuizSubmission {
  name?: string;
  phone?: string;
  responses?: Record<string, string>;
  score: number;
  totalPossible: number;
  percentage: number;
  submittedAt: string;
}

async function isQuizAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('quiz_admin_token')?.value;
  if (!token) return false;
  const validTokens = (await kvGet('quiz:admin_tokens') as string[]) || [];
  if (validTokens.length > 0) return validTokens.includes(token);
  return true;
}

// GET: Export results as CSV for a specific quiz
// ?quizId=xyz
export async function GET(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quizId = request.nextUrl.searchParams.get('quizId');
    if (!quizId) return NextResponse.json({ error: 'quizId required' }, { status: 400 });

    // Get quiz title
    const quizList = (await kvGet('quiz:list') as any[]) || [];
    const quiz = quizList.find((q: any) => q.id === quizId);
    const quizTitle = quiz?.title || 'Quiz';

    const index = (await kvGet(`quiz:${quizId}:submissions_index`) as string[]) || [];
    const submissions: QuizSubmission[] = [];

    for (const phone of index) {
      const sub = await kvGet(`quiz:${quizId}:submissions:${phone}`) as QuizSubmission;
      if (sub) submissions.push(sub);
    }

    submissions.sort((a, b) => b.score - a.score || a.submittedAt.localeCompare(b.submittedAt));

    const regFields = quiz?.registrationFields || [
      { id: 'f_name', label: 'Name' },
      { id: 'f_phone', label: 'Phone Number' }
    ];

    const staticHeaders = ['Rank', 'Score', 'Total Possible', 'Percentage', 'Submitted At'];
    const dynamicHeaders = regFields.map((f: any) => f.label);
    const headers = ['Rank', ...dynamicHeaders, 'Score', 'Total Possible', 'Percentage', 'Submitted At'];

    const rows = submissions.map((s, i) => {
      const dynamicRowData = regFields.map((f: any) => {
        const val = (s.responses && s.responses[f.id]) 
          ? s.responses[f.id] 
          : (f.id === 'f_name' ? s.name : (f.id === 'f_phone' ? s.phone : ''));
        return `"${(val || '').replace(/"/g, '""')}"`;
      });

      return [
        i + 1,
        ...dynamicRowData,
        s.score,
        s.totalPossible,
        `${s.percentage}%`,
        new Date(s.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      ];
    });

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const safeTitle = quizTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${safeTitle}-results-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error) {
    console.error('Error exporting results:', error);
    return NextResponse.json({ error: 'Failed to export results' }, { status: 500 });
  }
}
