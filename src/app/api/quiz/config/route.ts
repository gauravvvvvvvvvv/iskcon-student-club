// Quiz Configuration & CRUD API — Multi-quiz support
import { NextRequest, NextResponse } from 'next/server';
import { kvGet, kvSet, kvDel } from '../../../../lib/kv-store';

export const dynamic = 'force-dynamic';

interface QuizMeta {
  id: string;
  title: string;
  timerMinutes: number;
  launchTime: string;
  endTime: string;
  status: 'draft' | 'active' | 'ended';
  createdAt: string;
  updatedAt: string;
}

async function isQuizAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('quiz_admin_token')?.value;
  if (!token) return false;
  const validTokens = (await kvGet('quiz:admin_tokens') as string[]) || [];
  if (validTokens.length > 0) return validTokens.includes(token);
  return true;
}

// Helper: Check if schedules overlap
function checkOverlap(quizList: QuizMeta[], newQuiz: Partial<QuizMeta>, excludeId?: string): string | null {
  const nStart = newQuiz.launchTime ? new Date(newQuiz.launchTime).getTime() : 0;
  const nEnd = newQuiz.endTime ? new Date(newQuiz.endTime).getTime() : Infinity;

  // manual start (no launchTime) = now (0 for math purposes)
  // manual end (no endTime) = forever (Infinity)

  for (const q of quizList) {
    if (q.status === 'ended') continue;
    if (excludeId && q.id === excludeId) continue;

    const eStart = q.launchTime ? new Date(q.launchTime).getTime() : 0;
    const eEnd = q.endTime ? new Date(q.endTime).getTime() : Infinity;

    if (nStart < eEnd && nEnd > eStart) {
      return `Time slot overlaps with an existing quiz: "${q.title}" (${q.status}). Please choose a different time.`;
    }
  }
  return null;
}

// GET: Fetch quiz list + active quiz ID
// ?id=xyz → fetch single quiz meta
export async function GET(request: NextRequest) {
  try {
    const quizId = request.nextUrl.searchParams.get('id');
    let quizList = (await kvGet('quiz:list') as QuizMeta[]) || [];

    // Auto-start quizzes whose launchTime has passed and auto-end quizzes whose endTime has passed
    let modified = false;
    for (let i = 0; i < quizList.length; i++) {
      const now = new Date();
      // Auto-start
      if (quizList[i].status === 'draft' && quizList[i].launchTime && new Date(quizList[i].launchTime) <= now) {
        quizList[i] = { ...quizList[i], status: 'active', updatedAt: now.toISOString() };
        modified = true;
      }
      // Auto-end
      if (quizList[i].status === 'active' && quizList[i].endTime && new Date(quizList[i].endTime) <= now) {
        quizList[i] = { ...quizList[i], status: 'ended', updatedAt: now.toISOString() };
        modified = true;
      }
    }
    if (modified) await kvSet('quiz:list', quizList);

    if (quizId) {
      const quiz = quizList.find(q => q.id === quizId);
      if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
      return NextResponse.json({ quiz });
    }

    // activeQuizId = only truly 'active' quizzes (for student page)
    // currentQuizId = draft or active (for admin — shows which quiz is being worked on)
    const activeQuiz = quizList.find(q => q.status === 'active') || null;
    const currentQuiz = quizList.find(q => q.status === 'active' || q.status === 'draft') || null;

    return NextResponse.json({
      quizzes: quizList,
      activeQuizId: activeQuiz?.id || null,
      currentQuizId: currentQuiz?.id || null,
    });
  } catch (error) {
    console.error('Error fetching quiz config:', error);
    return NextResponse.json({ quizzes: [], activeQuizId: null });
  }
}

// POST: Create a new quiz (only if no active/draft quiz exists)
export async function POST(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, timerMinutes, launchTime, endTime } = await request.json();
    const quizList = (await kvGet('quiz:list') as QuizMeta[]) || [];

    // Check for schedule overlap
    const overlapError = checkOverlap(quizList, { launchTime, endTime });
    if (overlapError) {
      return NextResponse.json({ error: overlapError }, { status: 400 });
    }

    const newQuiz: QuizMeta = {
      id: `quiz_${Date.now()}`,
      title: title || 'Untitled Quiz',
      timerMinutes: timerMinutes || 10,
      launchTime: launchTime || '',
      endTime: endTime || '',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    quizList.unshift(newQuiz); // newest first
    await kvSet('quiz:list', quizList);

    return NextResponse.json({ quiz: newQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}

// PUT: Update a quiz (title, timer, status, launchTime)
export async function PUT(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, ...updates } = await request.json();
    if (!id) return NextResponse.json({ error: 'Quiz ID required' }, { status: 400 });

    const quizList = (await kvGet('quiz:list') as QuizMeta[]) || [];
    const idx = quizList.findIndex(q => q.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

    const proposed = { ...quizList[idx], ...updates };
    
    // Check for overlap if still draft/active
    if (proposed.status !== 'ended') {
      const overlapError = checkOverlap(quizList, proposed, id);
      if (overlapError) return NextResponse.json({ error: overlapError }, { status: 400 });
    }

    quizList[idx] = {
      ...proposed,
      updatedAt: new Date().toISOString(),
    };

    await kvSet('quiz:list', quizList);
    return NextResponse.json({ quiz: quizList[idx] });
  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json({ error: 'Failed to update quiz' }, { status: 500 });
  }
}

// DELETE: Delete a quiz and all its data (only if ended)
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Quiz ID required' }, { status: 400 });

    const quizList = (await kvGet('quiz:list') as QuizMeta[]) || [];
    const quiz = quizList.find(q => q.id === id);
    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

    if (quiz.status === 'active') {
      return NextResponse.json({ error: 'Cannot delete an active quiz. End it first.' }, { status: 400 });
    }

    // Delete quiz data
    await kvDel(`quiz:${id}:questions`);
    const subIndex = (await kvGet(`quiz:${id}:submissions_index`) as string[]) || [];
    for (const phone of subIndex) {
      await kvDel(`quiz:${id}:submissions:${phone}`);
    }
    await kvDel(`quiz:${id}:submissions_index`);

    // Remove from list
    const filtered = quizList.filter(q => q.id !== id);
    await kvSet('quiz:list', filtered);

    return NextResponse.json({ message: 'Quiz deleted' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json({ error: 'Failed to delete quiz' }, { status: 500 });
  }
}
