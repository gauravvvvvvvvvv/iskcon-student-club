// Bulk upload questions
import { NextRequest, NextResponse } from 'next/server';
import { kvGet, kvSet } from '../../../../../lib/kv-store';

export const dynamic = 'force-dynamic';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
}

async function isQuizAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('quiz_admin_token')?.value;
  if (!token) return false;
  const validTokens = (await kvGet('quiz:admin_tokens') as string[]) || [];
  if (validTokens.length > 0) return validTokens.includes(token);
  return true;
}

// POST: Add multiple questions
export async function POST(request: NextRequest) {
  try {
    if (!(await isQuizAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { quizId, questions } = body;

    if (!quizId) {
      return NextResponse.json({ error: 'Quiz ID is required' }, { status: 400 });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'A valid array of questions is required' }, { status: 400 });
    }

    const newQuestions: QuizQuestion[] = [];
    let count = 0;

    for (const q of questions) {
      const { question, options, correctIndex, points } = q;

      if (!question || !Array.isArray(options) || options.length !== 4 || typeof correctIndex !== 'number') {
        return NextResponse.json({
          error: `Invalid question format at index ${count}. Ensure there is a question string, an array of exactly 4 options, and a correctIndex integer.`
        }, { status: 400 });
      }

      newQuestions.push({
        id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 9)}_${count}`,
        question,
        options,
        correctIndex,
        points: points || 10
      });
      count++;
    }

    const existingQuestions = (await kvGet(`quiz:${quizId}:questions`) as QuizQuestion[]) || [];
    const updatedList = [...existingQuestions, ...newQuestions];
    
    await kvSet(`quiz:${quizId}:questions`, updatedList);

    return NextResponse.json({ 
      message: `Successfully added ${newQuestions.length} questions`,
      addedCount: newQuestions.length 
    });
  } catch (error) {
    console.error('Error in bulk question upload:', error);
    return NextResponse.json({ error: 'Failed to process bulk upload' }, { status: 500 });
  }
}
