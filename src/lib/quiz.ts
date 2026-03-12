// Client-side quiz API helper functions — Multi-quiz support
"use client";

// ==================== Types ====================

export interface QuizMeta {
  id: string;
  title: string;
  timerMinutes: number;
  launchTime: string;
  endTime: string;
  status: 'draft' | 'active' | 'ended';
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex?: number; // Only present for admin
  points: number;
  createdAt: string;
}

export interface QuizSubmission {
  name: string;
  phone: string;
  answers: Record<string, number>;
  score: number;
  totalPossible: number;
  percentage: number;
  submittedAt: string;
}

export interface QuizResults {
  submissions: QuizSubmission[];
  stats: {
    totalSubmissions: number;
    avgScore: number;
    highestScore: number;
    lowestScore: number;
  };
}

// ==================== Auth ====================

export async function authenticateQuizAdmin(password: string, deviceFingerprint?: string): Promise<boolean> {
  try {
    const response = await fetch('/api/quiz/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, deviceFingerprint }),
    });
    return response.ok;
  } catch (error) {
    console.error('Quiz auth error:', error);
    return false;
  }
}

export async function checkQuizAdminAuth(): Promise<boolean> {
  try {
    const response = await fetch('/api/quiz/auth', { cache: 'no-store' });
    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    console.error('Quiz auth check error:', error);
    return false;
  }
}

export async function logoutQuizAdmin(): Promise<void> {
  await fetch('/api/quiz/auth', { method: 'DELETE' });
}

// ==================== Quiz CRUD ====================

export async function fetchQuizList(): Promise<{ quizzes: QuizMeta[]; activeQuizId: string | null }> {
  try {
    const response = await fetch('/api/quiz/config', { cache: 'no-store' });
    const data = await response.json();
    return { quizzes: data.quizzes || [], activeQuizId: data.activeQuizId || null };
  } catch (error) {
    console.error('Error fetching quiz list:', error);
    return { quizzes: [], activeQuizId: null };
  }
}

export async function createQuiz(data: { title: string; timerMinutes: number; launchTime?: string; endTime?: string }): Promise<QuizMeta> {
  const response = await fetch('/api/quiz/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to create quiz');
  }
  const result = await response.json();
  return result.quiz;
}

export async function updateQuiz(id: string, updates: Partial<QuizMeta>): Promise<QuizMeta> {
  const response = await fetch('/api/quiz/config', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!response.ok) throw new Error('Failed to update quiz');
  const result = await response.json();
  return result.quiz;
}

export async function deleteQuiz(id: string): Promise<void> {
  const response = await fetch('/api/quiz/config', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to delete quiz');
  }
}

// ==================== Questions ====================

export async function fetchQuizQuestions(quizId: string): Promise<QuizQuestion[]> {
  try {
    const response = await fetch(`/api/quiz/questions?quizId=${encodeURIComponent(quizId)}`, { cache: 'no-store' });
    const data = await response.json();
    return data.questions || [];
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

export async function addQuizQuestion(quizId: string, question: {
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
}): Promise<QuizQuestion> {
  const response = await fetch('/api/quiz/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizId, ...question }),
  });
  if (!response.ok) throw new Error('Failed to add question');
  const data = await response.json();
  return data.question;
}

export async function bulkAddQuizQuestions(quizId: string, questions: Omit<QuizQuestion, 'id'>[]): Promise<{ message: string, addedCount: number }> {
  const response = await fetch('/api/quiz/questions/bulk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizId, questions }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to bulk add questions');
  return data;
}

export async function updateQuizQuestion(quizId: string, id: string, updates: Partial<Omit<QuizQuestion, 'id' | 'createdAt'>>): Promise<QuizQuestion> {
  const response = await fetch('/api/quiz/questions', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizId, id, ...updates }),
  });
  if (!response.ok) throw new Error('Failed to update question');
  const data = await response.json();
  return data.question;
}

export async function deleteQuizQuestion(quizId: string, id: string): Promise<void> {
  const response = await fetch('/api/quiz/questions', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizId, id }),
  });
  if (!response.ok) throw new Error('Failed to delete question');
}

// ==================== Submissions ====================

export async function submitQuizAnswers(name: string, phone: string, answers: Record<string, number>): Promise<{
  score: number;
  totalPossible: number;
  percentage: number;
  submission: QuizSubmission;
  answerKey?: any[];
}> {
  const response = await fetch('/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, answers }),
  });

  const data = await response.json();

  if (response.status === 409) {
    return {
      score: data.submission.score,
      totalPossible: data.submission.totalPossible,
      percentage: data.submission.percentage,
      submission: data.submission,
    };
  }

  if (!response.ok) throw new Error(data.error || 'Failed to submit quiz');
  return data;
}

export async function checkExistingSubmission(phone: string): Promise<{ submitted: boolean; submission?: QuizSubmission }> {
  try {
    const response = await fetch(`/api/quiz/submit?phone=${encodeURIComponent(phone)}`, { cache: 'no-store' });
    return await response.json();
  } catch (error) {
    console.error('Error checking submission:', error);
    return { submitted: false };
  }
}

// ==================== Results ====================

export async function fetchQuizResults(quizId: string): Promise<QuizResults> {
  const response = await fetch(`/api/quiz/results?quizId=${encodeURIComponent(quizId)}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch results');
  return await response.json();
}

export async function clearQuizResults(quizId: string): Promise<void> {
  const response = await fetch('/api/quiz/results', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizId }),
  });
  if (!response.ok) throw new Error('Failed to clear results');
}

// ==================== Export ====================

export async function exportQuizResultsCSV(quizId: string): Promise<void> {
  const response = await fetch(`/api/quiz/export?quizId=${encodeURIComponent(quizId)}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to export results');

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quiz-results-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
