"use client";
import { useState, useEffect } from 'react';
import {
  authenticateQuizAdmin,
  checkQuizAdminAuth,
  logoutQuizAdmin,
  fetchQuizList,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  fetchQuizQuestions,
  addQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  fetchQuizResults,
  clearQuizResults,
  exportQuizResultsCSV,
  bulkAddQuizQuestions,
  type QuizMeta,
  type QuizQuestion,
  type QuizResults,
  type FormField,
  type FormFieldType,
} from '../../../lib/quiz';

type View = 'list' | 'edit' | 'results';

export default function QuizAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Quiz list
  const [quizzes, setQuizzes] = useState<QuizMeta[]>([]);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [view, setView] = useState<View>('list');

  // Selected quiz for editing
  const [selectedQuiz, setSelectedQuiz] = useState<QuizMeta | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [activeTab, setActiveTab] = useState<'setup' | 'questions'>('setup');

  // New quiz form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTimer, setNewTimer] = useState(10);
  const [newLaunchTime, setNewLaunchTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [creating, setCreating] = useState(false);

  // Add question form
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '', options: ['', '', '', ''], correctIndex: 0, points: 1,
  });
  const [addingQuestion, setAddingQuestion] = useState(false);

  // Config save
  const [configSaving, setConfigSaving] = useState(false);

  // Form Builder Drag and Drop
  const [draggedFieldIndex, setDraggedFieldIndex] = useState<number | null>(null);
  const [openSelectId, setOpenSelectId] = useState<string | null>(null);

  // Results view
  const [resultsQuizId, setResultsQuizId] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);

  // ============ AUTH ============
  useEffect(() => {
    checkQuizAdminAuth().then(auth => {
      setIsAuthenticated(auth);
      setCheckingAuth(false);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadQuizList();
  }, [isAuthenticated]);

  const loadQuizList = async () => {
    const data = await fetchQuizList();
    setQuizzes(data.quizzes);
    setActiveQuizId(data.activeQuizId);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const success = await authenticateQuizAdmin(password);
      if (success) { setIsAuthenticated(true); setPassword(''); }
      else alert('Invalid password');
    } catch { alert('Login failed'); }
    finally { setLoginLoading(false); }
  };

  // ============ QUIZ CRUD ============
  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) { alert('Title is required'); return; }
    setCreating(true);
    try {
      const quiz = await createQuiz({
        title: newTitle.trim(),
        timerMinutes: newTimer,
        launchTime: newLaunchTime ? new Date(newLaunchTime).toISOString() : '',
        endTime: newEndTime ? new Date(newEndTime).toISOString() : '',
      });
      setQuizzes(prev => [quiz, ...prev]);
      setShowCreateForm(false);
      setNewTitle(''); setNewTimer(10); setNewLaunchTime(''); setNewEndTime('');
      openQuizEditor(quiz);
    } catch (error: any) {
      alert(error.message || 'Failed to create quiz');
    } finally { setCreating(false); }
  };

  const openQuizEditor = async (quiz: QuizMeta) => {
    setSelectedQuiz(quiz);
    setActiveTab('setup');
    const qs = await fetchQuizQuestions(quiz.id);
    setQuestions(qs);
    setView('edit');
  };

  const handleSaveConfig = async () => {
    if (!selectedQuiz) return;
    setConfigSaving(true);
    try {
      const updated = await updateQuiz(selectedQuiz.id, {
        title: selectedQuiz.title,
        timerMinutes: selectedQuiz.timerMinutes,
        launchTime: selectedQuiz.launchTime,
        endTime: selectedQuiz.endTime,
        registrationFields: selectedQuiz.registrationFields,
      });
      setSelectedQuiz(updated);
      setQuizzes(prev => prev.map(q => q.id === updated.id ? updated : q));
    } catch { alert('Failed to save'); }
    finally { setConfigSaving(false); }
  };

  const handleStatusChange = async (status: 'draft' | 'active' | 'ended') => {
    if (!selectedQuiz) return;
    const msgs: Record<string, string> = {
      active: 'Start the quiz? Students can take it immediately.',
      ended: 'End the quiz? No more submissions.',
      draft: 'Reset to draft?',
    };
    if (!confirm(msgs[status])) return;
    try {
      const updated = await updateQuiz(selectedQuiz.id, { status });
      setSelectedQuiz(updated);
      setQuizzes(prev => prev.map(q => q.id === updated.id ? updated : q));
      await loadQuizList();
    } catch { alert('Failed to change status'); }
  };

  const handleDeleteQuiz = async (id: string) => {
    const quiz = quizzes.find(q => q.id === id);
    if (!confirm(`Delete "${quiz?.title}"? This removes all questions and results permanently.`)) return;
    try {
      await deleteQuiz(id);
      setQuizzes(prev => prev.filter(q => q.id !== id));
      if (selectedQuiz?.id === id) { setSelectedQuiz(null); setView('list'); }
      if (resultsQuizId === id) { setResultsQuizId(null); setResults(null); }
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    }
  };

  // ============ FORM BUILDER ============
  const handleAddField = () => {
    if (!selectedQuiz) return;
    const newField: FormField = {
      id: `f_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false,
      isPrimaryId: false
    };
    setSelectedQuiz(prev => prev ? {
      ...prev,
      registrationFields: [...(prev.registrationFields || []), newField]
    } : prev);
  };

  const handleUpdateField = (index: number, updates: Partial<FormField>) => {
    if (!selectedQuiz) return;
    const fields = [...(selectedQuiz.registrationFields || [])];
    fields[index] = { ...fields[index], ...updates };
    setSelectedQuiz(prev => prev ? { ...prev, registrationFields: fields } : prev);
  };

  const handleRemoveField = (index: number) => {
    if (!selectedQuiz) return;
    const fields = [...(selectedQuiz.registrationFields || [])];
    
    if (fields[index].isPrimaryId) {
      alert("You cannot delete the Primary Identifier field. Please assign Primary ID to another field first.");
      return;
    }
    
    fields.splice(index, 1);
    setSelectedQuiz(prev => prev ? { ...prev, registrationFields: fields } : prev);
  };

  const handleSetPrimaryId = (index: number) => {
    if (!selectedQuiz) return;
    const fields = [...(selectedQuiz.registrationFields || [])];
    fields.forEach(f => f.isPrimaryId = false);
    fields[index].isPrimaryId = true;
    setSelectedQuiz(prev => prev ? { ...prev, registrationFields: fields } : prev);
  };

  const handleMoveField = (dragIndex: number, hoverIndex: number) => {
    if (!selectedQuiz) return;
    const fields = [...(selectedQuiz.registrationFields || [])];
    const dragItem = fields[dragIndex];
    fields.splice(dragIndex, 1);
    fields.splice(hoverIndex, 0, dragItem);
    setSelectedQuiz(prev => prev ? { ...prev, registrationFields: fields } : prev);
  };

  // ============ QUESTIONS ============
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuiz) return;
    if (!newQuestion.question.trim() || newQuestion.options.some(o => !o.trim())) {
      alert('Please fill all fields'); return;
    }
    setAddingQuestion(true);
    try {
      if (editingQuestionId) {
        // Edit existing question
        const updatedQ = await updateQuizQuestion(selectedQuiz.id, editingQuestionId, newQuestion);
        setQuestions(prev => prev.map(q => q.id === editingQuestionId ? updatedQ : q));
      } else {
        // Add new question
        const newQ = await addQuizQuestion(selectedQuiz.id, newQuestion);
        setQuestions(prev => [...prev, newQ]);
      }
      setNewQuestion({ question: '', options: ['', '', '', ''], correctIndex: 0, points: 1 });
      setEditingQuestionId(null);
      setShowAddForm(false);
    } catch { alert(`Failed to ${editingQuestionId ? 'update' : 'add'} question`); }
    finally { setAddingQuestion(false); }
  };

  const handleEditQuestion = (q: QuizQuestion) => {
    setEditingQuestionId(q.id);
    setNewQuestion({
      question: q.question,
      options: [...q.options],
      correctIndex: q.correctIndex,
      points: q.points || 10
    });
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditQuestion = () => {
    setNewQuestion({ question: '', options: ['', '', '', ''], correctIndex: 0, points: 1 });
    setEditingQuestionId(null);
    setShowAddForm(false);
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!selectedQuiz || !confirm('Delete this question?')) return;
    try {
      await deleteQuizQuestion(selectedQuiz.id, id);
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch { alert('Failed to delete question'); }
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedQuiz) return;
    const file = e.target.files?.[0];
    if (!file) return;

    // reset input
    e.target.value = '';

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const json = JSON.parse(text);

        if (!Array.isArray(json)) {
          alert('Invalid format: JSON file must contain an array of questions.');
          return;
        }

        setAddingQuestion(true);
        const res = await bulkAddQuizQuestions(selectedQuiz.id, json);
        alert(res.message);
        
        // Refresh questions
        const qs = await fetchQuizQuestions(selectedQuiz.id);
        setQuestions(qs);
        
      } catch (err: any) {
        alert('Failed to process JSON file: ' + (err.message || String(err)));
      } finally {
        setAddingQuestion(false);
      }
    };
    reader.readAsText(file);
  };

  // ============ RESULTS ============
  const openResults = async (quizId: string) => {
    setResultsQuizId(quizId);
    setResultsLoading(true);
    setView('results');
    try {
      const r = await fetchQuizResults(quizId);
      setResults(r);
    } catch { setResults(null); }
    finally { setResultsLoading(false); }
  };

  const handleClearResults = async () => {
    if (!resultsQuizId) return;
    if (!confirm('Clear ALL results? This cannot be undone!')) return;
    if (!confirm('Are you absolutely sure?')) return;
    try {
      await clearQuizResults(resultsQuizId);
      setResults({ submissions: [], stats: { totalSubmissions: 0, avgScore: 0, highestScore: 0, lowestScore: 0 } });
    } catch { alert('Failed to clear results'); }
  };

  const handleExportCSV = async () => {
    if (!resultsQuizId) return;
    try { await exportQuizResultsCSV(resultsQuizId); }
    catch { alert('Failed to export'); }
  };

  // ============ STYLES ============
  const s = {
    page: { minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: "'Inter', sans-serif" } as React.CSSProperties,
    loginContainer: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' } as React.CSSProperties,
    loginCard: { backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', minWidth: '320px', maxWidth: '400px', width: '100%', margin: '0 16px' } as React.CSSProperties,
    header: { backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1rem 1.5rem' } as React.CSSProperties,
    headerInner: { maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' } as React.CSSProperties,
    main: { maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' } as React.CSSProperties,
    card: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '1rem' } as React.CSSProperties,
    sectionTitle: { fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#111827' } as React.CSSProperties,
    label: { display: 'block', marginBottom: '6px', fontWeight: 500, color: '#374151', fontSize: '14px' } as React.CSSProperties,
    input: { width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#111827', backgroundColor: '#fff', fontFamily: "'Inter', sans-serif" } as React.CSSProperties,
    btnPrimary: { backgroundColor: '#d4a574', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', fontFamily: "'Inter', sans-serif" } as React.CSSProperties,
    btnDanger: { backgroundColor: '#ef4444', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', fontFamily: "'Inter', sans-serif" } as React.CSSProperties,
    btnSecondary: { backgroundColor: '#f3f4f6', color: '#374151', padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '14px', fontFamily: "'Inter', sans-serif" } as React.CSSProperties,
    statusBadge: (status: string) => ({
      display: 'inline-block', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
      background: status === 'active' ? '#dcfce7' : status === 'ended' ? '#fee2e2' : '#fef3c7',
      color: status === 'active' ? '#16a34a' : status === 'ended' ? '#dc2626' : '#d97706',
    } as React.CSSProperties),
    table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px' } as React.CSSProperties,
    th: { textAlign: 'left' as const, padding: '10px 12px', borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' as const } as React.CSSProperties,
    td: { padding: '10px 12px', borderBottom: '1px solid #f3f4f6', color: '#111827' } as React.CSSProperties,
    tab: (active: boolean) => ({
      padding: '0.75rem 1.25rem', border: 'none', backgroundColor: 'transparent',
      borderBottom: active ? '2px solid #d4a574' : 'none',
      color: active ? '#d4a574' : '#6b7280', fontWeight: active ? 600 : 400,
      cursor: 'pointer', fontSize: '14px', fontFamily: "'Inter', sans-serif",
    } as React.CSSProperties),
  };

  // ============ LOADING / LOGIN ============
  if (checkingAuth) {
    return (
      <div style={s.loginContainer}>
        <div style={{ ...s.loginCard, textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#d4a574' }}>Quiz Admin</div>
          <div style={{ color: '#6b7280' }}>Checking authentication...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={s.loginContainer}>
        <div style={s.loginCard}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center', color: '#d4a574' }}>Quiz Admin Panel</h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={s.label}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  style={{ ...s.input, paddingRight: '3rem' }} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#6b7280' }}>
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loginLoading} style={{ ...s.btnPrimary, width: '100%', opacity: loginLoading ? 0.6 : 1 }}>
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ============ DASHBOARD ============
  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#d4a574', margin: 0 }}>Quiz Admin Dashboard</h1>
            <span style={{ color: '#9ca3af', fontSize: '13px' }}>{quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {view !== 'list' && (
              <button onClick={() => { setView('list'); setSelectedQuiz(null); }} style={s.btnSecondary}>
                ← All Quizzes
              </button>
            )}
            <button onClick={async () => { await logoutQuizAdmin(); setIsAuthenticated(false); }} style={s.btnDanger}>Logout</button>
          </div>
        </div>
      </header>

      <main style={s.main}>

        {/* ============ QUIZ LIST VIEW ============ */}
        {view === 'list' && (
          <div>
            {/* Create New Quiz */}
            {!showCreateForm ? (
              <button
                onClick={() => setShowCreateForm(true)}
                style={{ ...s.btnPrimary, marginBottom: '1.5rem' }}
              >
                + Create New Quiz
              </button>
            ) : (
              <div style={{ ...s.card, border: '2px solid #d4a574' }}>
                <h2 style={s.sectionTitle}>New Quiz</h2>
                <form onSubmit={handleCreateQuiz}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={s.label}>Quiz Title *</label>
                    <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                      style={s.input} placeholder="e.g., Bhagavad Gita Chapter 2 Quiz" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={s.label}>Timer (minutes)</label>
                      <input type="number" min="1" max="120" value={newTimer}
                        onChange={e => setNewTimer(Number(e.target.value))} style={s.input} />
                    </div>
                    <div>
                      <label style={s.label}>Start Time (optional)</label>
                      <input type="datetime-local" value={newLaunchTime}
                        onChange={e => setNewLaunchTime(e.target.value)} style={s.input} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={s.label}>End Time (optional — quiz auto-ends at this time)</label>
                      <input type="datetime-local" value={newEndTime}
                        onChange={e => setNewEndTime(e.target.value)} style={s.input} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" disabled={creating} style={{ ...s.btnPrimary, opacity: creating ? 0.6 : 1 }}>
                      {creating ? 'Creating...' : 'Create Quiz'}
                    </button>
                    <button type="button" onClick={() => setShowCreateForm(false)} style={s.btnSecondary}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Quiz List */}
            {quizzes.length === 0 ? (
              <div style={{ ...s.card, textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                <p style={{ fontSize: '48px', marginBottom: '12px' }}>📝</p>
                <p>No quizzes yet. Create your first quiz!</p>
              </div>
            ) : (
              quizzes.map(quiz => (
                <div key={quiz.id} style={{ ...s.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>{quiz.title}</h3>
                      <span style={s.statusBadge(quiz.status)}>{quiz.status.toUpperCase()}</span>
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '13px' }}>
                      {quiz.timerMinutes} min • Created {new Date(quiz.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {quiz.status !== 'ended' && (
                      <button onClick={() => openQuizEditor(quiz)} style={{ ...s.btnPrimary, padding: '8px 16px', fontSize: '13px' }}>
                        ✏️ Edit
                      </button>
                    )}
                    <button onClick={() => openResults(quiz.id)} style={{ ...s.btnSecondary, padding: '8px 16px', fontSize: '13px' }}>
                      📊 Results
                    </button>
                    {quiz.status !== 'active' && (
                      <button onClick={() => handleDeleteQuiz(quiz.id)} style={{ ...s.btnDanger, padding: '8px 16px', fontSize: '13px' }}>
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ============ QUIZ EDITOR VIEW ============ */}
        {view === 'edit' && selectedQuiz && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>{selectedQuiz.title}</h2>
              <span style={s.statusBadge(selectedQuiz.status)}>{selectedQuiz.status.toUpperCase()}</span>
              <span style={{ color: '#9ca3af', fontSize: '13px' }}>{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #d1d5db', marginBottom: '1.5rem' }}>
              <button onClick={() => setActiveTab('setup')} style={s.tab(activeTab === 'setup')}>⚙️ Setup</button>
              <button onClick={() => setActiveTab('questions')} style={s.tab(activeTab === 'questions')}>📝 Questions ({questions.length})</button>
            </div>

            {/* Setup Tab */}
            {activeTab === 'setup' && (
              <div>
                <div style={s.card}>
                  <h2 style={s.sectionTitle}>Quiz Configuration</h2>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={s.label}>Quiz Title</label>
                    <input type="text" value={selectedQuiz.title}
                      onChange={e => setSelectedQuiz(prev => prev ? { ...prev, title: e.target.value } : prev)}
                      style={s.input} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={s.label}>Timer (minutes)</label>
                      <input type="number" min="1" max="120" value={selectedQuiz.timerMinutes}
                        onChange={e => setSelectedQuiz(prev => prev ? { ...prev, timerMinutes: Number(e.target.value) } : prev)}
                        style={s.input} />
                    </div>
                    <div>
                      <label style={s.label}>Scheduled Launch Time</label>
                      <input type="datetime-local"
                        value={selectedQuiz.launchTime ? (() => {
                          try {
                            const d = new Date(selectedQuiz.launchTime);
                            if (isNaN(d.getTime())) return '';
                            const pad = (n: number) => n.toString().padStart(2, '0');
                            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                          } catch { return ''; }
                        })() : ''}
                        onChange={e => {
                          const val = e.target.value;
                          const iso = val ? new Date(val).toISOString() : '';
                          setSelectedQuiz(prev => prev ? { ...prev, launchTime: iso } : prev);
                        }}
                        style={s.input} />
                    </div>
                    <div>
                      <input type="datetime-local"
                        value={selectedQuiz.endTime ? (() => {
                          try {
                            const d = new Date(selectedQuiz.endTime);
                            if (isNaN(d.getTime())) return '';
                            const pad = (n: number) => n.toString().padStart(2, '0');
                            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                          } catch { return ''; }
                        })() : ''}
                        onChange={e => {
                          const val = e.target.value;
                          const iso = val ? new Date(val).toISOString() : '';
                          setSelectedQuiz(prev => prev ? { ...prev, endTime: iso } : prev);
                        }}
                        style={s.input} />
                    </div>
                  </div>

                  {/* Form Builder Section */}
                  <div style={{ marginTop: '24px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', margin: 0 }}>Registration Form</h3>
                      <button onClick={handleAddField} style={{ ...s.btnSecondary, padding: '4px 12px', fontSize: '13px' }}>+ Add Field</button>
                    </div>
                    
                    <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '16px' }}>
                      Design the form students must submit before taking the quiz. Exactly one field must be marked as the <b>Primary ID</b> (used to block duplicate attempts).
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                      {(selectedQuiz.registrationFields || []).map((field, index) => (
                        <div 
                          key={field.id}
                          draggable
                          onDragStart={() => setDraggedFieldIndex(index)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (draggedFieldIndex !== null && draggedFieldIndex !== index) {
                              handleMoveField(draggedFieldIndex, index);
                            }
                            setDraggedFieldIndex(null);
                          }}
                          style={{
                            background: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '12px',
                            display: 'flex',
                            gap: '12px',
                            opacity: draggedFieldIndex === index ? 0.5 : 1,
                            cursor: 'grab'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af', cursor: 'grab' }}>
                            ☰
                          </div>
                          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(150px, 2fr) minmax(120px, 1fr) auto', gap: '12px', alignItems: 'flex-start' }}>
                            {/* Label */}
                            <div>
                              <input 
                                type="text"
                                value={field.label}
                                onChange={(e) => handleUpdateField(index, { label: e.target.value })}
                                placeholder="Field Label (e.g. Area, Email)"
                                style={{ ...s.input, padding: '6px 10px', fontSize: '14px', marginBottom: '8px' }}
                              />
                              {(field.type === 'select' || field.type === 'radio') && (
                                <input 
                                  type="text"
                                  value={(field as any)._rawOptions !== undefined ? (field as any)._rawOptions : (field.options || []).join(', ')}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    handleUpdateField(index, { 
                                      options: val.split(',').map(o => o.trim()).filter(Boolean),
                                      _rawOptions: val
                                    } as any);
                                  }}
                                  onBlur={() => handleUpdateField(index, { _rawOptions: undefined } as any)}
                                  placeholder="Options separated by comma"
                                  style={{ ...s.input, padding: '6px 10px', fontSize: '13px', borderColor: '#d1d5db' }}
                                />
                              )}
                            </div>
                            
                            {/* Type */}
                            <div style={{ position: 'relative' }}>
                              {openSelectId === field.id && (
                                <div onClick={() => setOpenSelectId(null)} style={{ position: 'fixed', inset: 0, zIndex: 9 }} />
                              )}
                              <div
                                onClick={() => setOpenSelectId(openSelectId === field.id ? null : field.id)}
                                style={{
                                  ...s.input,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '6px 10px',
                                  fontSize: '14px',
                                  position: 'relative',
                                  zIndex: 10,
                                  minWidth: '155px'
                                }}
                              >
                                {{
                                  'text': 'Short Text',
                                  'phone': 'Phone Number',
                                  'email': 'Email',
                                  'select': 'Dropdown (Select)',
                                  'radio': 'Multiple Choice'
                                }[field.type] || 'Select...'}
                                <svg width="10" height="10" viewBox="0 0 12 12" style={{ transform: openSelectId === field.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                                  <path fill="#6b7280" d="M6 8L1 3h10z"/>
                                </svg>
                              </div>
                              {openSelectId === field.id && (
                                <div style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: 0,
                                  right: 0,
                                  marginTop: '4px',
                                  background: '#ffffff',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '6px',
                                  overflow: 'hidden',
                                  zIndex: 20,
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}>
                                  {[
                                    { value: 'text', label: 'Short Text' },
                                    { value: 'phone', label: 'Phone Number' },
                                    { value: 'email', label: 'Email' },
                                    { value: 'select', label: 'Dropdown (Select)' },
                                    { value: 'radio', label: 'Multiple Choice' }
                                  ].map((opt) => (
                                    <div
                                      key={opt.value}
                                      onClick={() => {
                                        handleUpdateField(index, { type: opt.value as FormFieldType });
                                        setOpenSelectId(null);
                                      }}
                                      style={{
                                        padding: '8px 10px',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        background: field.type === opt.value ? '#f3f4f6' : 'transparent',
                                        color: field.type === opt.value ? '#111827' : '#4b5563',
                                        transition: 'background 0.2s',
                                        fontWeight: field.type === opt.value ? 500 : 400
                                      }}
                                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                                      onMouseLeave={(e) => (e.currentTarget.style.background = field.type === opt.value ? '#f3f4f6' : 'transparent')}
                                    >
                                      {opt.label}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Controls */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                <input 
                                  type="checkbox" 
                                  checked={field.required}
                                  onChange={(e) => handleUpdateField(index, { required: e.target.checked })}
                                  style={{ accentColor: '#d4a574' }}
                                /> Required 
                              </label>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                <input 
                                  type="radio" 
                                  name="primaryId"
                                  checked={field.isPrimaryId || false}
                                  onChange={() => handleSetPrimaryId(index)}
                                  style={{ accentColor: '#d4a574' }}
                                /> Primary ID
                              </label>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => handleRemoveField(index)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                            title="Remove Field"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleSaveConfig} disabled={configSaving}
                    style={{ ...s.btnPrimary, opacity: configSaving ? 0.6 : 1 }}>
                    {configSaving ? 'Saving...' : 'Save Configuration'}
                  </button>
                </div>

                {/* Status Controls */}
                <div style={s.card}>
                  <h2 style={s.sectionTitle}>Quiz Status</h2>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
                    Current: <span style={s.statusBadge(selectedQuiz.status)}>{selectedQuiz.status.toUpperCase()}</span>
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {selectedQuiz.status !== 'active' && (
                      <button onClick={() => handleStatusChange('active')}
                        style={{ ...s.btnPrimary, backgroundColor: '#16a34a' }}>🚀 Start Quiz</button>
                    )}
                    {selectedQuiz.status === 'active' && (
                      <button onClick={() => handleStatusChange('ended')} style={s.btnDanger}>🛑 End Quiz</button>
                    )}
                    {selectedQuiz.status !== 'draft' && (
                      <button onClick={() => handleStatusChange('draft')} style={s.btnSecondary}>↩️ Reset to Draft</button>
                    )}
                  </div>
                </div>

                {/* Quiz Link */}
                <div style={s.card}>
                  <h2 style={s.sectionTitle}>Quiz Page Link</h2>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '10px 14px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <code style={{ flex: 1, fontSize: '13px', color: '#374151', wordBreak: 'break-all' }}>
                      {typeof window !== 'undefined' ? `${window.location.origin}/gitamritam/weekly-quiz` : '/gitamritam/weekly-quiz'}
                    </code>
                    <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/gitamritam/weekly-quiz`); alert('Copied!'); }}
                      style={{ ...s.btnSecondary, padding: '6px 14px', fontSize: '13px' }}>Copy</button>
                  </div>
                </div>
              </div>
            )}

            {/* Questions Tab */}
            {activeTab === 'questions' && (
              <div>
                {!showAddForm && (
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <button onClick={() => setShowAddForm(true)} style={s.btnPrimary}>+ Add Question</button>
                    <div>
                      <input 
                        type="file" 
                        accept=".json" 
                        style={{ display: 'none' }} 
                        id="bulk-upload-json"
                        onChange={handleBulkUpload}
                        disabled={addingQuestion}
                      />
                      <label 
                        htmlFor="bulk-upload-json" 
                        style={{ ...s.btnSecondary, cursor: addingQuestion ? 'not-allowed' : 'pointer', opacity: addingQuestion ? 0.6 : 1, display: 'inline-block' }}
                      >
                        {addingQuestion ? 'Uploading...' : '📁 Upload JSON'}
                      </label>
                    </div>
                  </div>
                )}

                {showAddForm && (
                  <div style={{ ...s.card, border: '2px solid #d4a574' }}>
                    <h2 style={s.sectionTitle}>{editingQuestionId ? 'Edit Question' : 'New Question'}</h2>
                    <form onSubmit={handleSaveQuestion}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={s.label}>Question *</label>
                        <textarea value={newQuestion.question}
                          onChange={e => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                          style={{ ...s.input, minHeight: '70px', resize: 'vertical' }}
                          placeholder="Enter the question..." required />
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={s.label}>Options (select correct answer) *</label>
                        {newQuestion.options.map((opt, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <input type="radio" name="correctAnswer" checked={newQuestion.correctIndex === i}
                              onChange={() => setNewQuestion(prev => ({ ...prev, correctIndex: i }))}
                              style={{ accentColor: '#d4a574', width: '18px', height: '18px' }} />
                            <input type="text" value={opt}
                              onChange={e => { const opts = [...newQuestion.options]; opts[i] = e.target.value; setNewQuestion(prev => ({ ...prev, options: opts })); }}
                              style={{ ...s.input, flex: 1 }} placeholder={`Option ${String.fromCharCode(65 + i)}`} required />
                          </div>
                        ))}
                        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>🔘 Selected = correct answer</p>
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <label style={s.label}>Points</label>
                        <input type="number" min="1" max="100" value={newQuestion.points}
                          onChange={e => setNewQuestion(prev => ({ ...prev, points: Number(e.target.value) }))}
                          style={{ ...s.input, maxWidth: '120px' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" disabled={addingQuestion} style={{ ...s.btnPrimary, opacity: addingQuestion ? 0.6 : 1 }}>
                          {addingQuestion ? 'Saving...' : (editingQuestionId ? 'Update Question' : 'Add Question')}
                        </button>
                        <button type="button" onClick={cancelEditQuestion} style={s.btnSecondary}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                {questions.length === 0 ? (
                  <div style={{ ...s.card, textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <p style={{ fontSize: '48px', marginBottom: '12px' }}>📝</p>
                    <p>No questions yet. Add your first question!</p>
                  </div>
                ) : (
                  questions.map((q, i) => (
                    <div key={q.id} style={s.card}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', flex: 1 }}>
                          <span style={{ color: '#d4a574' }}>Q{i + 1}.</span> {q.question}
                        </h3>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px', flexShrink: 0 }}>
                          <span style={{ padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, background: '#fef3c7', color: '#d97706' }}>
                            {q.points} pt{q.points !== 1 ? 's' : ''}
                          </span>
                          <button onClick={() => handleEditQuestion(q)}
                            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '14px', padding: '2px 6px' }} title="Edit Question">✏️</button>
                          <button onClick={() => handleDeleteQuestion(q.id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px', padding: '2px 6px' }} title="Delete Question">🗑️</button>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {q.options.map((opt, oi) => (
                          <div key={oi} style={{
                            padding: '8px 12px', borderRadius: '8px', fontSize: '14px',
                            background: q.correctIndex === oi ? '#dcfce7' : '#f9fafb',
                            border: `1px solid ${q.correctIndex === oi ? '#86efac' : '#e5e7eb'}`,
                            color: q.correctIndex === oi ? '#16a34a' : '#374151',
                            fontWeight: q.correctIndex === oi ? 600 : 400,
                          }}>
                            {String.fromCharCode(65 + oi)}. {opt}{q.correctIndex === oi && ' ✓'}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}

                {questions.length > 0 && (
                  <div style={{ textAlign: 'center', padding: '12px', color: '#6b7280', fontSize: '14px', background: '#f9fafb', borderRadius: '8px' }}>
                    Total: {questions.length} questions • {questions.reduce((sum, q) => sum + q.points, 0)} points
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ============ RESULTS VIEW ============ */}
        {view === 'results' && resultsQuizId && (() => {
        const resultsQuiz = quizzes.find(q => q.id === resultsQuizId);
        const regFields = resultsQuiz?.registrationFields || [
          { id: 'f_name', type: 'text', label: 'Name', required: true, isPrimaryId: false },
          { id: 'f_phone', type: 'phone', label: 'Phone', required: true, isPrimaryId: true }
        ];

        return (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>
              📊 Results — {resultsQuiz?.title || 'Quiz'}
            </h2>

            {resultsLoading ? (
              <div style={{ ...s.card, textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>Loading results...</div>
            ) : !results || results.stats.totalSubmissions === 0 ? (
              <div style={{ ...s.card, textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                <p style={{ fontSize: '48px', marginBottom: '12px' }}>📊</p>
                <p>No submissions yet.</p>
              </div>
            ) : (
              <>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
                  {[
                    { label: 'Submissions', value: results.stats.totalSubmissions, color: '#3b82f6' },
                    { label: 'Avg Score', value: `${results.stats.avgScore}%`, color: '#d4a574' },
                    { label: 'Highest', value: results.stats.highestScore, color: '#16a34a' },
                    { label: 'Lowest', value: results.stats.lowestScore, color: '#ef4444' },
                  ].map(stat => (
                    <div key={stat.label} style={{ ...s.card, textAlign: 'center', padding: '16px', marginBottom: 0 }}>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <button onClick={handleExportCSV} style={s.btnPrimary}>📥 Download CSV</button>
                  <button onClick={() => openResults(resultsQuizId)} style={s.btnSecondary}>🔄 Refresh</button>
                  <button onClick={handleClearResults} style={{ ...s.btnDanger, marginLeft: 'auto' }}>🗑️ Clear All</button>
                </div>

                {/* Table */}
                <div style={{ ...s.card, overflowX: 'auto', padding: '0' }}>
                  <table style={s.table}>
                    <thead>
                      <tr>
                        <th style={s.th}>#</th>
                        {regFields.map((f: any) => (
                          <th key={f.id} style={s.th}>{f.label}</th>
                        ))}
                        <th style={s.th}>Score</th>
                        <th style={s.th}>%</th>
                        <th style={s.th}>Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.submissions.map((sub, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                          <td style={s.td}>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              width: '24px', height: '24px', borderRadius: '50%', fontSize: '12px', fontWeight: 600,
                              background: i === 0 ? '#fef3c7' : i === 1 ? '#f3f4f6' : i === 2 ? '#fff7ed' : 'transparent',
                              color: i === 0 ? '#d97706' : i === 1 ? '#6b7280' : i === 2 ? '#ea580c' : '#9ca3af',
                            }}>{i + 1}</span>
                          </td>
                          {regFields.map((f: any) => {
                            const val = (sub.responses && sub.responses[f.id])
                              ? sub.responses[f.id]
                              : (f.id === 'f_name' ? sub.name : (f.id === 'f_phone' ? sub.phone : ''));
                            return (
                              <td key={f.id} style={{ ...s.td, fontWeight: f.id === 'f_name' ? 500 : 400, color: f.id === 'f_phone' ? '#6b7280' : 'inherit' }}>
                                {val}
                              </td>
                            );
                          })}
                          <td style={s.td}>{sub.score}/{sub.totalPossible}</td>
                          <td style={s.td}>
                            <span style={{
                              padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: 600,
                              background: sub.percentage >= 70 ? '#dcfce7' : sub.percentage >= 40 ? '#fef3c7' : '#fee2e2',
                              color: sub.percentage >= 70 ? '#16a34a' : sub.percentage >= 40 ? '#d97706' : '#dc2626',
                            }}>{sub.percentage}%</span>
                          </td>
                          <td style={{ ...s.td, color: '#9ca3af', fontSize: '13px' }}>
                            {new Date(sub.submittedAt).toLocaleString('en-IN', {
                              timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        );
      })()}
      </main>
    </div>
  );
}
