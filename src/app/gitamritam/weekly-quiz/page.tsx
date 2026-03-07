"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchQuizList,
  fetchQuizQuestions,
  submitQuizAnswers,
  checkExistingSubmission,
  type QuizMeta,
  type QuizQuestion,
  type QuizSubmission,
} from '../../../lib/quiz';

type PageState = 'loading' | 'not-active' | 'register' | 'quiz' | 'submitting' | 'results';

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', name: 'India', maxLen: 10 },
  { code: '+1', country: 'US', name: 'United States', maxLen: 10 },
  { code: '+1', country: 'CA', name: 'Canada', maxLen: 10 },
  { code: '+44', country: 'GB', name: 'United Kingdom', maxLen: 10 },
  { code: '+61', country: 'AU', name: 'Australia', maxLen: 9 },
  { code: '+64', country: 'NZ', name: 'New Zealand', maxLen: 10 },
  { code: '+27', country: 'ZA', name: 'South Africa', maxLen: 9 },
  { code: '+49', country: 'DE', name: 'Germany', maxLen: 11 },
  { code: '+33', country: 'FR', name: 'France', maxLen: 9 },
  { code: '+39', country: 'IT', name: 'Italy', maxLen: 10 },
  { code: '+34', country: 'ES', name: 'Spain', maxLen: 9 },
  { code: '+351', country: 'PT', name: 'Portugal', maxLen: 9 },
  { code: '+31', country: 'NL', name: 'Netherlands', maxLen: 9 },
  { code: '+32', country: 'BE', name: 'Belgium', maxLen: 9 },
  { code: '+41', country: 'CH', name: 'Switzerland', maxLen: 9 },
  { code: '+43', country: 'AT', name: 'Austria', maxLen: 10 },
  { code: '+46', country: 'SE', name: 'Sweden', maxLen: 9 },
  { code: '+47', country: 'NO', name: 'Norway', maxLen: 8 },
  { code: '+45', country: 'DK', name: 'Denmark', maxLen: 8 },
  { code: '+358', country: 'FI', name: 'Finland', maxLen: 10 },
  { code: '+48', country: 'PL', name: 'Poland', maxLen: 9 },
  { code: '+420', country: 'CZ', name: 'Czech Republic', maxLen: 9 },
  { code: '+36', country: 'HU', name: 'Hungary', maxLen: 9 },
  { code: '+40', country: 'RO', name: 'Romania', maxLen: 9 },
  { code: '+30', country: 'GR', name: 'Greece', maxLen: 10 },
  { code: '+353', country: 'IE', name: 'Ireland', maxLen: 9 },
  { code: '+354', country: 'IS', name: 'Iceland', maxLen: 7 },
  { code: '+7', country: 'RU', name: 'Russia', maxLen: 10 },
  { code: '+380', country: 'UA', name: 'Ukraine', maxLen: 9 },
  { code: '+90', country: 'TR', name: 'Turkey', maxLen: 10 },
  { code: '+972', country: 'IL', name: 'Israel', maxLen: 9 },
  { code: '+966', country: 'SA', name: 'Saudi Arabia', maxLen: 9 },
  { code: '+971', country: 'AE', name: 'UAE', maxLen: 9 },
  { code: '+974', country: 'QA', name: 'Qatar', maxLen: 8 },
  { code: '+968', country: 'OM', name: 'Oman', maxLen: 8 },
  { code: '+973', country: 'BH', name: 'Bahrain', maxLen: 8 },
  { code: '+965', country: 'KW', name: 'Kuwait', maxLen: 8 },
  { code: '+962', country: 'JO', name: 'Jordan', maxLen: 9 },
  { code: '+961', country: 'LB', name: 'Lebanon', maxLen: 8 },
  { code: '+964', country: 'IQ', name: 'Iraq', maxLen: 10 },
  { code: '+98', country: 'IR', name: 'Iran', maxLen: 10 },
  { code: '+92', country: 'PK', name: 'Pakistan', maxLen: 10 },
  { code: '+93', country: 'AF', name: 'Afghanistan', maxLen: 9 },
  { code: '+880', country: 'BD', name: 'Bangladesh', maxLen: 10 },
  { code: '+94', country: 'LK', name: 'Sri Lanka', maxLen: 9 },
  { code: '+977', country: 'NP', name: 'Nepal', maxLen: 10 },
  { code: '+95', country: 'MM', name: 'Myanmar', maxLen: 9 },
  { code: '+66', country: 'TH', name: 'Thailand', maxLen: 9 },
  { code: '+84', country: 'VN', name: 'Vietnam', maxLen: 9 },
  { code: '+62', country: 'ID', name: 'Indonesia', maxLen: 11 },
  { code: '+60', country: 'MY', name: 'Malaysia', maxLen: 10 },
  { code: '+65', country: 'SG', name: 'Singapore', maxLen: 8 },
  { code: '+63', country: 'PH', name: 'Philippines', maxLen: 10 },
  { code: '+855', country: 'KH', name: 'Cambodia', maxLen: 9 },
  { code: '+856', country: 'LA', name: 'Laos', maxLen: 10 },
  { code: '+86', country: 'CN', name: 'China', maxLen: 11 },
  { code: '+81', country: 'JP', name: 'Japan', maxLen: 10 },
  { code: '+82', country: 'KR', name: 'South Korea', maxLen: 10 },
  { code: '+852', country: 'HK', name: 'Hong Kong', maxLen: 8 },
  { code: '+886', country: 'TW', name: 'Taiwan', maxLen: 9 },
  { code: '+976', country: 'MN', name: 'Mongolia', maxLen: 8 },
  { code: '+55', country: 'BR', name: 'Brazil', maxLen: 11 },
  { code: '+54', country: 'AR', name: 'Argentina', maxLen: 10 },
  { code: '+56', country: 'CL', name: 'Chile', maxLen: 9 },
  { code: '+57', country: 'CO', name: 'Colombia', maxLen: 10 },
  { code: '+58', country: 'VE', name: 'Venezuela', maxLen: 10 },
  { code: '+51', country: 'PE', name: 'Peru', maxLen: 9 },
  { code: '+593', country: 'EC', name: 'Ecuador', maxLen: 9 },
  { code: '+591', country: 'BO', name: 'Bolivia', maxLen: 8 },
  { code: '+595', country: 'PY', name: 'Paraguay', maxLen: 9 },
  { code: '+598', country: 'UY', name: 'Uruguay', maxLen: 8 },
  { code: '+52', country: 'MX', name: 'Mexico', maxLen: 10 },
  { code: '+506', country: 'CR', name: 'Costa Rica', maxLen: 8 },
  { code: '+507', country: 'PA', name: 'Panama', maxLen: 8 },
  { code: '+20', country: 'EG', name: 'Egypt', maxLen: 10 },
  { code: '+234', country: 'NG', name: 'Nigeria', maxLen: 10 },
  { code: '+254', country: 'KE', name: 'Kenya', maxLen: 9 },
  { code: '+255', country: 'TZ', name: 'Tanzania', maxLen: 9 },
  { code: '+256', country: 'UG', name: 'Uganda', maxLen: 9 },
  { code: '+233', country: 'GH', name: 'Ghana', maxLen: 9 },
  { code: '+237', country: 'CM', name: 'Cameroon', maxLen: 9 },
  { code: '+251', country: 'ET', name: 'Ethiopia', maxLen: 9 },
  { code: '+212', country: 'MA', name: 'Morocco', maxLen: 9 },
  { code: '+216', country: 'TN', name: 'Tunisia', maxLen: 8 },
  { code: '+213', country: 'DZ', name: 'Algeria', maxLen: 9 },
  { code: '+263', country: 'ZW', name: 'Zimbabwe', maxLen: 9 },
  { code: '+260', country: 'ZM', name: 'Zambia', maxLen: 9 },
  { code: '+230', country: 'MU', name: 'Mauritius', maxLen: 8 },
  { code: '+679', country: 'FJ', name: 'Fiji', maxLen: 7 },
  { code: '+675', country: 'PG', name: 'Papua New Guinea', maxLen: 8 },
];

export default function WeeklyQuizPage() {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [config, setConfig] = useState<QuizMeta | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneError, setPhoneError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState<{ score: number; totalPossible: number; percentage: number } | null>(null);
  const [answerKey, setAnswerKey] = useState<Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    points: number;
    selectedIndex: number;
    isCorrect: boolean;
  }>>([]);
  const [existingSubmission, setExistingSubmission] = useState<QuizSubmission | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAutoSubmitted = useRef(false);

  // Load quiz config on mount
  useEffect(() => {
    loadQuizConfig();
  }, []);

  const loadQuizConfig = async () => {
    const data = await fetchQuizList();
    // Only show quiz to students if it's truly active
    const activeQuiz = data.quizzes.find(q => q.status === 'active');
    if (activeQuiz) {
      setConfig(activeQuiz);
      setPageState('register');
    } else {
      // Find the next upcoming scheduled quiz
      const now = new Date().getTime();
      const upcomingQuizzes = data.quizzes
        .filter(q => q.status === 'draft' && q.launchTime && new Date(q.launchTime).getTime() > now)
        .sort((a, b) => new Date(a.launchTime as string).getTime() - new Date(b.launchTime as string).getTime());

      // Show next upcoming quiz, or fallback to the latest quiz if none are scheduled
      const nextQuiz = upcomingQuizzes.length > 0 ? upcomingQuizzes[0] : (data.quizzes[0] || null);
      setConfig(nextQuiz);
      setPageState('not-active');
    }
  };

  // Timer countdown
  useEffect(() => {
    if (pageState !== 'quiz' || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (!hasAutoSubmitted.current) {
            hasAutoSubmitted.current = true;
            handleSubmit(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pageState]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getSelectedCountry = () => COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];

  const validatePhone = (value: string) => {
    const clean = value.replace(/\D/g, '');
    const selected = getSelectedCountry();
    if (clean.length === 0) {
      setPhoneError('');
      return false;
    }
    if (clean.length < 7 || clean.length > selected.maxLen) {
      setPhoneError(`Please enter a valid phone number (${selected.maxLen} digits for ${selected.name})`);
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!validatePhone(phone)) return;

    const cleanPhone = countryCode + phone.replace(/\D/g, '');

    // Check if already submitted
    const check = await checkExistingSubmission(cleanPhone);
    if (check.submitted && check.submission) {
      setExistingSubmission(check.submission);
      setResult({
        score: check.submission.score,
        totalPossible: check.submission.totalPossible,
        percentage: check.submission.percentage,
      });
      setPageState('results');
      return;
    }

    // Load questions and start quiz
    const qs = await fetchQuizQuestions(config!.id);

    // Shuffle questions
    const shuffled = [...qs].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setTimeLeft((config?.timerMinutes || 10) * 60);
    hasAutoSubmitted.current = false;
    setPageState('quiz');
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = useCallback(async (isAutoSubmit = false) => {
    if (pageState === 'submitting') return;

    if (!isAutoSubmit) {
      const unanswered = questions.length - Object.keys(answers).length;
      if (unanswered > 0) {
        if (!confirm(`You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Submit anyway?`)) {
          return;
        }
      } else {
        if (!confirm('Are you sure you want to submit your quiz?')) {
          return;
        }
      }
    }

    setPageState('submitting');
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const cleanPhone = countryCode + phone.replace(/\D/g, '');
      const data = await submitQuizAnswers(name.trim(), cleanPhone, answers);
      setResult({
        score: data.score,
        totalPossible: data.totalPossible,
        percentage: data.percentage,
      });
      if ((data as any).answerKey) setAnswerKey((data as any).answerKey);
      setPageState('results');
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit quiz. Retrying...');
      // Retry once
      try {
        const cleanPhone = countryCode + phone.replace(/\D/g, '');
        const data = await submitQuizAnswers(name.trim(), cleanPhone, answers);
        setResult({
          score: data.score,
          totalPossible: data.totalPossible,
          percentage: data.percentage,
        });
        if ((data as any).answerKey) setAnswerKey((data as any).answerKey);
        setPageState('results');
      } catch (retryError) {
        alert('Failed to submit. Please check your internet connection.');
        setPageState('quiz');
      }
    }
  }, [answers, name, phone, countryCode, questions, pageState]);

  const answeredCount = Object.keys(answers).length;
  const timerPercentage = config ? (timeLeft / (config.timerMinutes * 60)) * 100 : 100;
  const isTimerCritical = timeLeft <= 60;

  // ==================== STYLES ====================
  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: "'Inter', system-ui, sans-serif",
    } as React.CSSProperties,
    container: {
      maxWidth: '720px',
      margin: '0 auto',
      padding: '20px 16px',
    } as React.CSSProperties,
    header: {
      textAlign: 'center' as const,
      padding: '32px 0 24px',
    } as React.CSSProperties,
    logo: {
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '3px',
      textTransform: 'uppercase' as const,
      color: '#d4a574',
      marginBottom: '8px',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(24px, 5vw, 36px)',
      fontWeight: 700,
      color: '#ffffff',
      margin: '8px 0',
      fontFamily: "'Playfair Display', serif",
    } as React.CSSProperties,
    subtitle: {
      fontSize: '15px',
      color: 'rgba(255,255,255,0.6)',
    } as React.CSSProperties,
    card: {
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: '32px',
      marginBottom: '16px',
    } as React.CSSProperties,
    input: {
      width: '100%',
      padding: '14px 18px',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.15)',
      background: 'rgba(255,255,255,0.08)',
      color: '#ffffff',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.3s',
      fontFamily: "'Inter', sans-serif",
    } as React.CSSProperties,
    label: {
      display: 'block',
      marginBottom: '8px',
      color: 'rgba(255,255,255,0.8)',
      fontSize: '14px',
      fontWeight: 500,
    } as React.CSSProperties,
    primaryBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: '14px',
      border: 'none',
      background: 'linear-gradient(135deg, #d4a574 0%, #c9956c 100%)',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 20px rgba(212,165,116,0.35)',
      fontFamily: "'Inter', sans-serif",
    } as React.CSSProperties,
    timerBar: {
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
      background: 'rgba(15,15,30,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '12px 16px',
    } as React.CSSProperties,
    questionCard: {
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: '24px',
      marginBottom: '16px',
      transition: 'border-color 0.3s',
    } as React.CSSProperties,
    option: (isSelected: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 18px',
      borderRadius: '12px',
      border: `2px solid ${isSelected ? '#d4a574' : 'rgba(255,255,255,0.1)'}`,
      background: isSelected ? 'rgba(212,165,116,0.12)' : 'rgba(255,255,255,0.03)',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#ffffff',
      fontSize: '15px',
      marginBottom: '8px',
    } as React.CSSProperties),
    radio: (isSelected: boolean) => ({
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: `2px solid ${isSelected ? '#d4a574' : 'rgba(255,255,255,0.3)'}`,
      background: isSelected ? '#d4a574' : 'transparent',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    } as React.CSSProperties),
    badge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
    } as React.CSSProperties,
  };

  // ==================== LOADING ====================
  if (pageState === 'loading') {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🪷</div>
            <div style={{ color: '#d4a574', fontSize: '16px', fontWeight: 500 }}>Loading quiz...</div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== NOT ACTIVE ====================
  if (pageState === 'not-active') {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.logo}>ISKCON Delhi University</div>
            <h1 style={styles.title}>Gitamritam</h1>
            <p style={styles.subtitle}>For issues: <a href="mailto:admin@iskcondelhiuniversity.com">admin@iskcondelhiuniversity.com</a></p>
          </div>
          <div style={{ ...styles.card, textAlign: 'center', padding: '48px 32px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📖</div>
            <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 600, marginBottom: '12px' }}>
              {config?.status === 'ended' ? 'Quiz Has Ended' : 'Quiz Coming Soon'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              {config?.status === 'ended'
                ? 'This quiz has been completed. Stay tuned for the next one!'
                : config?.launchTime
                  ? `The quiz is scheduled for ${new Date(config.launchTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'short' })}`
                  : 'The quiz hasn\'t been scheduled yet. Check back later!'}
            </p>
            <a href="/" style={{
              display: 'inline-block',
              padding: '12px 28px',
              borderRadius: '12px',
              border: '1px solid rgba(212,165,116,0.4)',
              color: '#d4a574',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s',
            }}>
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==================== REGISTRATION ====================
  if (pageState === 'register') {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.logo}>ISKCON Delhi University</div>
            <h1 style={styles.title}>{config?.title || 'Weekly Quiz'}</h1>
            <p style={styles.subtitle}>
              {config?.timerMinutes ? `${config.timerMinutes} minutes` : ''} • Test your knowledge
            </p>
          </div>

          <div style={styles.card}>
            <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>
              Enter Your Details
            </h2>
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '20px' }}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  style={styles.input}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Phone Number *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={countryCode}
                    onChange={e => {
                      setCountryCode(e.target.value);
                      setPhone('');
                      setPhoneError('');
                    }}
                    style={{
                      ...styles.input,
                      width: '140px',
                      flexShrink: 0,
                      cursor: 'pointer',
                      appearance: 'none' as const,
                      WebkitAppearance: 'none' as const,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      paddingRight: '30px',
                    }}
                  >
                    {COUNTRY_CODES.map((c, i) => (
                      <option key={`${c.country}-${i}`} value={c.code} style={{ background: '#1a1a2e', color: '#fff' }}>
                        {c.country} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => {
                      const maxLen = getSelectedCountry().maxLen;
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, maxLen);
                      setPhone(val);
                      if (val.length === maxLen) validatePhone(val);
                      else if (val.length > 0) setPhoneError('');
                    }}
                    placeholder={`${getSelectedCountry().maxLen}-digit number`}
                    required
                    maxLength={getSelectedCountry().maxLen}
                    style={{ ...styles.input, flex: 1 }}
                  />
                </div>
                {phoneError && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{phoneError}</p>
                )}
              </div>
              <button type="submit" style={styles.primaryBtn}>
                Start Quiz →
              </button>
            </form>
          </div>

          <div style={{ textAlign: 'center', padding: '16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
              ⏱️ You will have {config?.timerMinutes || 10} minutes to complete the quiz
            </p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginTop: '4px' }}>
              The quiz will auto-submit when the timer runs out
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SUBMITTING ====================
  if (pageState === 'submitting') {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <div style={{ ...styles.card, textAlign: 'center', padding: '48px' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              border: '3px solid rgba(212,165,116,0.3)', borderTopColor: '#d4a574',
              animation: 'spin 1s linear infinite', margin: '0 auto 20px',
            }} />
            <h2 style={{ color: '#ffffff', fontSize: '20px', marginBottom: '8px' }}>Submitting your answers...</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Please wait</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  // ==================== RESULTS ====================
  if (pageState === 'results' && result) {
    const getEmoji = (pct: number) => {
      if (pct >= 90) return '🏆';
      if (pct >= 70) return '🌟';
      if (pct >= 50) return '👏';
      if (pct >= 30) return '💪';
      return '📚';
    };

    const getMessage = (pct: number) => {
      if (pct >= 90) return 'Outstanding! You truly know the Gita!';
      if (pct >= 70) return 'Great job! Keep studying!';
      if (pct >= 50) return 'Good effort! There\'s more to learn.';
      if (pct >= 30) return 'Keep practicing. The Gita has infinite wisdom!';
      return 'Every attempt is a step closer to knowledge!';
    };

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.logo}>ISKCON Delhi University</div>
            <h1 style={styles.title}>Quiz Results</h1>
          </div>

          <div style={{ ...styles.card, textAlign: 'center', padding: '40px 32px' }}>
            <div style={{ fontSize: '64px', marginBottom: '12px' }}>{getEmoji(result.percentage)}</div>
            <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
              {result.score} / {result.totalPossible}
            </h2>
            <div style={{
              display: 'inline-block',
              padding: '6px 20px',
              borderRadius: '20px',
              background: result.percentage >= 70
                ? 'rgba(34,197,94,0.15)' : result.percentage >= 40
                  ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
              color: result.percentage >= 70
                ? '#4ade80' : result.percentage >= 40
                  ? '#fbbf24' : '#f87171',
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '16px',
            }}>
              {result.percentage}%
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.6 }}>
              {getMessage(result.percentage)}
            </p>

            {existingSubmission && (
              <p style={{
                color: 'rgba(255,255,255,0.35)', fontSize: '13px',
                marginTop: '16px', fontStyle: 'italic',
              }}>
                Submitted on {new Date(existingSubmission.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            )}
          </div>

          {/* Answer Review */}
          {answerKey.length > 0 && (
            <>
              <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>
                📋 Answer Review
              </h2>
              {answerKey.map((q, i) => (
                <div key={q.id} style={{
                  ...styles.card,
                  borderColor: q.isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, flex: 1 }}>
                      <span style={{ color: '#d4a574', marginRight: '8px' }}>Q{i + 1}.</span>
                      {q.question}
                    </h3>
                    <span style={{
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginLeft: '12px', flexShrink: 0,
                      background: q.isCorrect ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                      color: q.isCorrect ? '#4ade80' : '#f87171',
                    }}>
                      {q.isCorrect ? '✓ Correct' : '✗ Wrong'} • {q.points} pts
                    </span>
                  </div>
                  <div>
                    {q.options.map((opt, oi) => {
                      const isCorrect = oi === q.correctIndex;
                      const isSelected = oi === q.selectedIndex;
                      const isWrongPick = isSelected && !isCorrect;

                      let bg = 'rgba(255,255,255,0.03)';
                      let border = 'rgba(255,255,255,0.08)';
                      let color = 'rgba(255,255,255,0.7)';
                      let icon = '';

                      if (isCorrect) {
                        bg = 'rgba(34,197,94,0.12)';
                        border = 'rgba(34,197,94,0.4)';
                        color = '#4ade80';
                        icon = ' ✓';
                      }
                      if (isWrongPick) {
                        bg = 'rgba(239,68,68,0.12)';
                        border = 'rgba(239,68,68,0.4)';
                        color = '#f87171';
                        icon = ' ✗';
                      }

                      return (
                        <div key={oi} style={{
                          padding: '12px 16px', borderRadius: '10px', marginBottom: '6px',
                          border: `1px solid ${border}`, background: bg, color,
                          fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px',
                          fontWeight: (isCorrect || isWrongPick) ? 600 : 400,
                        }}>
                          <span style={{
                            width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: 700,
                            background: isCorrect ? 'rgba(34,197,94,0.2)'
                              : isWrongPick ? 'rgba(239,68,68,0.2)'
                                : 'rgba(255,255,255,0.08)',
                            color: isCorrect ? '#4ade80' : isWrongPick ? '#f87171' : 'rgba(255,255,255,0.5)',
                          }}>
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span style={{ flex: 1 }}>{opt}</span>
                          {(isCorrect || isWrongPick) && (
                            <span style={{ fontSize: '13px', fontWeight: 700 }}>{icon}</span>
                          )}
                          {isSelected && !isWrongPick && (
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Your answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {q.selectedIndex === -1 && (
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '8px', fontStyle: 'italic' }}>
                      ⚠️ Not answered
                    </p>
                  )}
                </div>
              ))}
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: '24px', paddingBottom: '40px' }}>
            <a href="/" style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #d4a574 0%, #c9956c 100%)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(212,165,116,0.35)',
            }}>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==================== QUIZ ====================
  return (
    <div style={styles.page}>
      {/* Sticky Timer Bar */}
      <div style={styles.timerBar}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500 }}>
              {answeredCount}/{questions.length} answered
            </span>
            <span style={{
              color: isTimerCritical ? '#f87171' : '#d4a574',
              fontSize: '20px',
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              animation: isTimerCritical ? 'pulse 1s infinite' : 'none',
            }}>
              ⏱ {formatTime(timeLeft)}
            </span>
          </div>
          {/* Timer progress bar */}
          <div style={{
            width: '100%', height: '4px', borderRadius: '2px',
            background: 'rgba(255,255,255,0.1)',
          }}>
            <div style={{
              width: `${timerPercentage}%`, height: '100%', borderRadius: '2px',
              background: isTimerCritical
                ? 'linear-gradient(90deg, #ef4444, #f87171)'
                : 'linear-gradient(90deg, #d4a574, #c9956c)',
              transition: 'width 1s linear, background 0.5s',
            }} />
          </div>
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      </div>

      <div style={styles.container}>
        <div style={{ padding: '8px 0 16px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600 }}>
            {config?.title || 'Weekly Quiz'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '4px' }}>
            Select one answer for each question
          </p>
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => {
          const isAnswered = answers[q.id] !== undefined;
          return (
            <div key={q.id} style={{
              ...styles.questionCard,
              borderColor: isAnswered ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.1)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, flex: 1 }}>
                  <span style={{ color: '#d4a574', marginRight: '8px' }}>Q{qIndex + 1}.</span>
                  {q.question}
                </h3>
                <span style={{
                  ...styles.badge,
                  background: 'rgba(212,165,116,0.12)',
                  color: '#d4a574',
                  marginLeft: '12px',
                  flexShrink: 0,
                }}>
                  {q.points} pts
                </span>
              </div>

              <div>
                {q.options.map((opt, optIndex) => {
                  const isSelected = answers[q.id] === optIndex;
                  return (
                    <div
                      key={optIndex}
                      onClick={() => handleAnswerSelect(q.id, optIndex)}
                      style={styles.option(isSelected)}
                    >
                      <div style={styles.radio(isSelected)}>
                        {isSelected && (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />
                        )}
                      </div>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Submit Button */}
        <div style={{ padding: '16px 0 40px' }}>
          <button
            onClick={() => handleSubmit(false)}
            style={{
              ...styles.primaryBtn,
              opacity: answeredCount === 0 ? 0.5 : 1,
            }}
            disabled={answeredCount === 0}
          >
            Submit Quiz ({answeredCount}/{questions.length} answered)
          </button>
        </div>
      </div>
    </div>
  );
}
