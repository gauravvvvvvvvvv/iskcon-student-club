// Quiz Results API — Multi-quiz support
import { NextRequest, NextResponse } from 'next/server';
import { kvGet, kvSet, kvDel } from '../../../../lib/kv-store';

export const dynamic = 'force-dynamic';

interface QuizSubmission {
  name: string;
  phone: string;
  answers: Record<string, number>;
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

// GET: Fetch results for a specific quiz
// ?quizId=xyz (admin) or ?phone=1234567890 (student, auto-detects active quiz)
export async function GET(request: NextRequest) {
  try {
    const isAdmin = await isQuizAdmin(request);
    const quizId = request.nextUrl.searchParams.get('quizId');
    const phone = request.nextUrl.searchParams.get('phone');

    if (isAdmin && quizId) {
      const index = (await kvGet(`quiz:${quizId}:submissions_index`) as string[]) || [];
      const submissions: QuizSubmission[] = [];

      for (const p of index) {
        const sub = await kvGet(`quiz:${quizId}:submissions:${p}`) as QuizSubmission;
        if (sub) submissions.push(sub);
      }

      submissions.sort((a, b) => b.score - a.score || a.submittedAt.localeCompare(b.submittedAt));

      const totalSubmissions = submissions.length;
      const avgScore = totalSubmissions > 0
        ? Math.round(submissions.reduce((sum, s) => sum + s.percentage, 0) / totalSubmissions)
        : 0;

      return NextResponse.json({
        submissions,
        stats: {
          totalSubmissions,
          avgScore,
          highestScore: submissions[0]?.score || 0,
          lowestScore: submissions[submissions.length - 1]?.score || 0
        }
      });
    }

    if (phone) {
      // Student checking their result — check active quiz
      const quizList = (await kvGet('quiz:list') as any[]) || [];
      const activeQuiz = quizList.find((q: any) => q.status === 'active');
      if (!activeQuiz) return NextResponse.json({ error: 'No active quiz' }, { status: 404 });

      const cleanPhone = phone.replace(/\D/g, '');
      const submission = await kvGet(`quiz:${activeQuiz.id}:submissions:${cleanPhone}`) as QuizSubmission;
      if (submission) {
        return NextResponse.json({ submission });
      }
      return NextResponse.json({ error: 'No submission found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'quizId or phone required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}

// DELETE: Clear all results for a quiz (admin only)
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId } = await request.json();
    if (!quizId) return NextResponse.json({ error: 'quizId required' }, { status: 400 });

    const index = (await kvGet(`quiz:${quizId}:submissions_index`) as string[]) || [];
    for (const phone of index) {
      await kvDel(`quiz:${quizId}:submissions:${phone}`);
    }
    await kvSet(`quiz:${quizId}:submissions_index`, []);

    return NextResponse.json({ message: 'All results cleared' });
  } catch (error) {
    console.error('Error clearing results:', error);
    return NextResponse.json({ error: 'Failed to clear results' }, { status: 500 });
  }
}
