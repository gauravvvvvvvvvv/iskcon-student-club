// Quiz Submission API — Multi-quiz support
import { NextRequest, NextResponse } from 'next/server';
import { kvGet, kvSet } from '../../../../lib/kv-store';

export const dynamic = 'force-dynamic';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
}

export type FormFieldType = 'text' | 'email' | 'phone' | 'select' | 'radio';

interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  required: boolean;
  options?: string[];
  isPrimaryId?: boolean;
}

interface QuizMeta {
  id: string;
  status: 'draft' | 'active' | 'ended';
  timerMinutes: number;
  launchTime: string;
  endTime: string;
  registrationFields?: FormField[]; // Added
  updatedAt: string;
}

interface QuizSubmission {
  name?: string; // Legacy
  phone?: string; // Legacy
  responses?: Record<string, string>; // Maps Field ID -> User's Answer
  answers: Record<string, number>;
  score: number;
  totalPossible: number;
  percentage: number;
  submittedAt: string;
}

// POST: Submit quiz answers (auto-detects active quiz)
export async function POST(request: NextRequest) {
  try {
    const { responses, answers } = await request.json();

    if (!responses || !answers) {
      return NextResponse.json({ error: 'Responses and answers are required' }, { status: 400 });
    }

    // Auto-update statuses based on time
    let quizList = (await kvGet('quiz:list') as QuizMeta[]) || [];
    let modified = false;
    const now = new Date();

    for (let i = 0; i < quizList.length; i++) {
      if (quizList[i].status === 'draft' && quizList[i].launchTime && new Date(quizList[i].launchTime) <= now) {
        quizList[i] = { ...quizList[i], status: 'active', updatedAt: now.toISOString() };
        modified = true;
      }
      if (quizList[i].status === 'active' && quizList[i].endTime && new Date(quizList[i].endTime) <= now) {
        quizList[i] = { ...quizList[i], status: 'ended', updatedAt: now.toISOString() };
        modified = true;
      }
    }
    if (modified) await kvSet('quiz:list', quizList);

    // Find active quiz, or a quiz that ended within the last 5 minutes (grace period)
    const activeQuiz = quizList.find(q => {
      if (q.status === 'active') return true;
      if (q.status === 'ended' && q.endTime) {
        const diffMs = now.getTime() - new Date(q.endTime).getTime();
        return diffMs <= 5 * 60000; // 5 minute grace period for submissions
      }
      return false;
    });

    if (!activeQuiz) {
      return NextResponse.json({ error: 'No active quiz right now' }, { status: 403 });
    }

    const quizId = activeQuiz.id;

    // Determine the Primary ID value
    const regFields = activeQuiz.registrationFields || [
      { id: 'f_name', type: 'text', label: 'Name', required: true, isPrimaryId: false },
      { id: 'f_phone', type: 'phone', label: 'Phone Number', required: true, isPrimaryId: true }
    ];

    const primaryField = regFields.find((f: any) => f.isPrimaryId) || regFields[0];
    let primaryIdValue = responses[primaryField.id];

    if (!primaryIdValue) {
      return NextResponse.json({ error: `Missing primary identifier: ${primaryField.label}` }, { status: 400 });
    }

    if (primaryField.type === 'phone') {
      primaryIdValue = primaryIdValue.replace(/\D/g, '');
      if (primaryIdValue.length < 7 || primaryIdValue.length > 15) {
        return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
      }
    } else if (primaryField.type === 'email') {
      primaryIdValue = primaryIdValue.toLowerCase().trim();
    }

    // Check if already submitted for this quiz
    const existing = await kvGet(`quiz:${quizId}:submissions:${primaryIdValue}`);
    if (existing) {
      return NextResponse.json({ error: 'Already submitted', submission: existing }, { status: 409 });
    }

    // Score the quiz
    const questions = (await kvGet(`quiz:${quizId}:questions`) as QuizQuestion[]) || [];
    let score = 0;
    let totalPossible = 0;

    for (const q of questions) {
      totalPossible += q.points;
      if (answers[q.id] !== undefined && Number(answers[q.id]) === q.correctIndex) {
        score += q.points;
      }
    }

    const percentage = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;

    const submission: QuizSubmission = {
      responses,
      answers,
      score,
      totalPossible,
      percentage,
      submittedAt: new Date().toISOString()
    };

    // Keep backwards compatibility for results view that checks for name/phone explicitly
    if (responses['f_name']) submission.name = responses['f_name'].trim();
    if (responses['f_phone']) submission.phone = responses['f_phone'].replace(/\D/g, '');

    await kvSet(`quiz:${quizId}:submissions:${primaryIdValue}`, submission);

    const index = (await kvGet(`quiz:${quizId}:submissions_index`) as string[]) || [];
    if (!index.includes(primaryIdValue)) {
      index.push(primaryIdValue);
      await kvSet(`quiz:${quizId}:submissions_index`, index);
    }

    // Build answer key for review
    const answerKey = questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      points: q.points,
      selectedIndex: answers[q.id] !== undefined ? Number(answers[q.id]) : -1,
      isCorrect: answers[q.id] !== undefined && Number(answers[q.id]) === q.correctIndex,
    }));

    return NextResponse.json({ score, totalPossible, percentage, submission, answerKey });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}

// GET: Check if primary ID already submitted for active quiz
export async function GET(request: NextRequest) {
  try {
    const primaryIdValueRaw = request.nextUrl.searchParams.get('primaryIdValue');
    let phone = request.nextUrl.searchParams.get('phone'); // legacy fallback
    
    let primaryIdValue = primaryIdValueRaw || phone;
    
    if (!primaryIdValue) return NextResponse.json({ error: 'Primary ID value required' }, { status: 400 });

    const quizList = (await kvGet('quiz:list') as any[]) || [];
    const activeQuiz = quizList.find((q: any) => q.status === 'active');
    if (!activeQuiz) return NextResponse.json({ submitted: false });

    // Clean if it seems like a phone number (legacy mode)
    if (phone) primaryIdValue = primaryIdValue.replace(/\D/g, '');

    const submission = await kvGet(`quiz:${activeQuiz.id}:submissions:${primaryIdValue}`);

    if (submission) {
      return NextResponse.json({ submitted: true, submission });
    }
    return NextResponse.json({ submitted: false });
  } catch (error) {
    console.error('Error checking submission:', error);
    return NextResponse.json({ submitted: false });
  }
}
