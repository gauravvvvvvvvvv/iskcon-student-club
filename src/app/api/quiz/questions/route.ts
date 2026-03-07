// Quiz Questions CRUD API — Multi-quiz support
import { NextRequest, NextResponse } from 'next/server';
import { kvGet, kvSet } from '../../../../lib/kv-store';

export const dynamic = 'force-dynamic';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  createdAt: string;
}

async function isQuizAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('quiz_admin_token')?.value;
  if (!token) return false;
  const validTokens = (await kvGet('quiz:admin_tokens') as string[]) || [];
  if (validTokens.length > 0) return validTokens.includes(token);
  return true;
}

// GET: Fetch questions for a quiz
// ?quizId=xyz (required)
export async function GET(request: NextRequest) {
  try {
    const quizId = request.nextUrl.searchParams.get('quizId');
    if (!quizId) return NextResponse.json({ error: 'quizId required' }, { status: 400 });

    const questions = (await kvGet(`quiz:${quizId}:questions`) as QuizQuestion[]) || [];
    const isAdmin = await isQuizAdmin(request);

    if (isAdmin) {
      return NextResponse.json({ questions });
    }

    // Strip correct answers for students
    const studentQuestions = questions.map(({ correctIndex, ...rest }) => rest);
    return NextResponse.json({ questions: studentQuestions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ questions: [] });
  }
}

// POST: Add a question to a quiz
export async function POST(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId, question, options, correctIndex, points } = await request.json();
    if (!quizId) return NextResponse.json({ error: 'quizId required' }, { status: 400 });

    if (!question || !options || options.length !== 4 || correctIndex === undefined || !points) {
      return NextResponse.json({ error: 'Invalid question data' }, { status: 400 });
    }

    const newQuestion: QuizQuestion = {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      question,
      options,
      correctIndex: Number(correctIndex),
      points: Number(points),
      createdAt: new Date().toISOString()
    };

    const questions = (await kvGet(`quiz:${quizId}:questions`) as QuizQuestion[]) || [];
    questions.push(newQuestion);
    await kvSet(`quiz:${quizId}:questions`, questions);

    return NextResponse.json({ question: newQuestion });
  } catch (error) {
    console.error('Error adding question:', error);
    return NextResponse.json({ error: 'Failed to add question' }, { status: 500 });
  }
}

// PUT: Update a question
export async function PUT(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId, id, question, options, correctIndex, points } = await request.json();
    if (!quizId || !id) return NextResponse.json({ error: 'quizId and question id required' }, { status: 400 });

    const questions = (await kvGet(`quiz:${quizId}:questions`) as QuizQuestion[]) || [];
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return NextResponse.json({ error: 'Question not found' }, { status: 404 });

    questions[index] = {
      ...questions[index],
      ...(question && { question }),
      ...(options && { options }),
      ...(correctIndex !== undefined && { correctIndex: Number(correctIndex) }),
      ...(points && { points: Number(points) })
    };

    await kvSet(`quiz:${quizId}:questions`, questions);
    return NextResponse.json({ question: questions[index] });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 });
  }
}

// DELETE: Remove a question
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId, id } = await request.json();
    if (!quizId || !id) return NextResponse.json({ error: 'quizId and question id required' }, { status: 400 });

    const questions = (await kvGet(`quiz:${quizId}:questions`) as QuizQuestion[]) || [];
    const filtered = questions.filter(q => q.id !== id);
    if (filtered.length === questions.length) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    await kvSet(`quiz:${quizId}:questions`, filtered);
    return NextResponse.json({ message: 'Question deleted' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 });
  }
}
