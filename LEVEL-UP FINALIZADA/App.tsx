import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { initializeData, authService, taskService, goalService, habitService } from './services/store';
import { User, Task, Goal, Habit } from './types';
import Layout from './components/Layout';
import ConfirmationModal from './components/ConfirmationModal';
import AnimatedAuthBackground from './components/AnimatedAuthBackground';
import { Loader2, Gem } from 'lucide-react';

// Lazy load das páginas para code-splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TasksPage = React.lazy(() => import('./pages/TasksPage'));
const GoalsPage = React.lazy(() => import('./pages/GoalsPage'));
const HabitsPage = React.lazy(() => import('./pages/HabitsPage'));
const Welcome = React.lazy(() => import('./pages/Welcome'));

// Componente de loading
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="relative">
      <div className="absolute inset-0 bg-purple-700 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <Loader2 className="animate-spin text-purple-500 relative z-10" size={40}/>
    </div>
  </div>
);

// Componente que contém toda a lógica do aplicativo
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  
  // Data State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);

  // Auth Form State
  const [authMode, setAuthMode] = useState<'LOGIN' | 'LOGIN'>('REGISTER');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Login Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register Fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regBirthDate, setRegBirthDate] = useState('');

  // --- GOAL STATE ---
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetValue: '',
    unit: 'un',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });
  const [updateGoalId, setUpdateGoalId] = useState<string | null>(null);
  const [updateGoalValue, setUpdateGoalValue] = useState('');
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  // --- HABIT STATE ---
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [habitFormTitle, setHabitFormTitle] = useState('');
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);

  // --- CONFIRMATION MODAL STATE ---
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    isDangerous?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    isDangerous: false,
  });

  // Efeito de transição de página
  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => setPageTransition(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    initializeData();
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      refreshData();
    }
    setLoading(false);
  }, []);

  const refreshData = () => {
    setTasks(taskService.getAll());
    setGoals(goalService.getAll());
    setHabits(habitService.getAll());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      refreshData();
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao logar');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);
    try {
      const response = await authService.register(regName, regEmail, regPassword, regPhone);
      setUser(response.user);
      refreshData();
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegPassword('');
      setRegBirthDate('');
      navigate('/dashboard');
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao registrar');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setAuthMode('LOGIN');
    navigate('/');
  };

  // --- TASK HANDLERS ---
  const addTask = (task: any) => { taskService.create(task); refreshData(); };
  const toggleTask = (id: string) => { taskService.toggle(id); refreshData(); };
  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setConfirmModal({
      isOpen: true,
      title: 'Apagar Tarefa',
      message: `Tem certeza que deseja apagar a tarefa "${task?.title}"? Esta ação não pode ser desfeita.`,
      isDangerous: true,
      onConfirm: () => {
        taskService.delete(id);
        refreshData();
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  // --- HABIT HANDLERS ---
  const toggleHabit = (id: string) => { habitService.toggleToday(id); refreshData(); };
  
  const handleHabitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHabitId) {
      habitService.update(editingHabitId, habitFormTitle);
    } else {
      habitService.create(habitFormTitle);
    }
    setHabitFormTitle('');
    setEditingHabitId(null);
    setIsHabitModalOpen(false);
    refreshData();
  };

  const openHabitEdit = (habit: Habit) => {
    setHabitFormTitle(habit.title);
    setEditingHabitId(habit.id);
    setIsHabitModalOpen(true);
  };
  
  const deleteHabit = (id: string) => {
    const habit = habits.find(h => h.id === id);
    setConfirmModal({
      isOpen: true,
      title: 'Apagar Hábito',
      message: `Tem certeza que deseja apagar o hábito "${habit?.title}"? Todos os dados serão perdidos.`,
      isDangerous: true,
      onConfirm: () => {
        habitService.delete(id);
        refreshData();
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  // --- GOAL HANDLERS ---
  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetValue || !newGoal.endDate) return;

    if (editingGoalId) {
      // Update existing goal
      goalService.update(editingGoalId, {
        title: newGoal.title,
        targetValue: Number(newGoal.targetValue),
        unit: newGoal.unit,
        startDate: newGoal.startDate,
        endDate: newGoal.endDate
      });
      setEditingGoalId(null);
    } else {
      // Create new goal
      goalService.create({
        title: newGoal.title,
        targetValue: Number(newGoal.targetValue),
        currentValue: 0,
        unit: newGoal.unit,
        startDate: newGoal.startDate,
        endDate: newGoal.endDate
      });
    }

    setIsGoalModalOpen(false);
    setNewGoal({ title: '', targetValue: '', unit: 'un', startDate: new Date().toISOString().split('T')[0], endDate: '' });
    refreshData();
  };

  const openGoalEdit = (goal: Goal) => {
    setNewGoal({
      title: goal.title,
      targetValue: String(goal.targetValue),
      unit: goal.unit,
      startDate: goal.startDate,
      endDate: goal.endDate
    });
    setEditingGoalId(goal.id);
    setIsGoalModalOpen(true);
  };

  const deleteGoal = (id: string) => {
    const goal = goals.find(g => g.id === id);
    setConfirmModal({
      isOpen: true,
      title: 'Desistir da Meta',
      message: `Tem certeza que deseja desistir da meta "${goal?.title}"? Você perderá todo o progresso.`,
      isDangerous: true,
      onConfirm: () => {
        goalService.delete(id);
        refreshData();
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  const handleUpdateProgress = (goalId: string, currentVal: number) => {
    if (updateGoalId === goalId) {
      setUpdateGoalId(null);
    } else {
      setUpdateGoalId(goalId);
      setUpdateGoalValue(currentVal.toString());
    }
  };

  const saveGoalProgress = (goalId: string) => {
    goalService.updateProgress(goalId, Number(updateGoalValue));
    setUpdateGoalId(null);
    refreshData();
  };

  // --- LOADING SCREEN ---
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-purple-950">
        <div className="relative">
            <div className="absolute inset-0 bg-purple-700 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <Loader2 className="animate-spin text-purple-500 relative z-10" size={50}/>
        </div>
    </div>
  );

  // --- AUTH SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedAuthBackground />
        
        <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden transition-all duration-300 ${
          pageTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600"></div>
          
          <div className="p-8 space-y-8">
            {/* Logo Section */}
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-600 mb-4">
                <Gem className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-purple-900 tracking-tight">LevelUp</h1>
              <p className="text-purple-200 text-sm mt-2">
                {authMode === 'LOGIN' ? 'Bem-vindo de volta' : 'Comece sua jornada agora'}
              </p>
            </div>
            
            {authMode === 'LOGIN' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300 transition-all"
                      placeholder="••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-purple-300 hover:text-purple-200"
                    >
                      👁️
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-700">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-700 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
                >
                  {isAuthLoading ? 'Carregando...' : 'Entrar'}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Não tem conta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('REGISTER');
                      setAuthError('');
                    }}
                    className="text-purple-700 font-semibold hover:text-purple-500"
                  >
                    Cadastre-se
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data de Nascimento</label>
                  <input
                    type="date"
                    required
                    value={regBirthDate}
                    onChange={(e) => setRegBirthDate(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300"
                      placeholder="••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-purple-300 hover:text-purple-200"
                    >
                      👁️
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-700">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-700 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
                >
                  {isAuthLoading ? 'Carregando...' : 'Criar Conta'}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Já tem conta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('LOGIN');
                      setAuthError('');
                    }}
                    className="text-purple-700 font-semibold hover:text-purple-500"
                  >
                    Entrar
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN APP (Logged In) ---
  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className={`transition-all duration-300 ${pageTransition ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        <Routes>
          <Route path="/dashboard" element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard tasks={tasks} goals={goals} habits={habits} />
            </Suspense>
          } />
          <Route path="/tasks" element={
            <Suspense fallback={<PageLoader />}>
              <TasksPage
                tasks={tasks}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            </Suspense>
          } />
          <Route path="/goals" element={
            <Suspense fallback={<PageLoader />}>
              <GoalsPage
                goals={goals}
                onAddGoal={() => setIsGoalModalOpen(true)}
                onDeleteGoal={deleteGoal}
                onUpdateProgress={handleUpdateProgress}
                updateGoalId={updateGoalId}
                updateGoalValue={updateGoalValue}
                setUpdateGoalValue={setUpdateGoalValue}
                saveGoalProgress={saveGoalProgress}
                isGoalModalOpen={isGoalModalOpen}
                setIsGoalModalOpen={setIsGoalModalOpen}
                newGoal={newGoal}
                setNewGoal={setNewGoal}
                handleGoalSubmit={handleGoalSubmit}
                onEditGoal={openGoalEdit}
                editingGoalId={editingGoalId}
                onCloseGoalModal={() => { setIsGoalModalOpen(false); setEditingGoalId(null); }}
              />
            </Suspense>
          } />
          <Route path="/habits" element={
            <Suspense fallback={<PageLoader />}>
              <HabitsPage
                habits={habits}
                onToggleHabit={toggleHabit}
                onDeleteHabit={deleteHabit}
                onEditHabit={openHabitEdit}
                isHabitModalOpen={isHabitModalOpen}
                setIsHabitModalOpen={setIsHabitModalOpen}
                habitFormTitle={habitFormTitle}
                setHabitFormTitle={setHabitFormTitle}
                handleHabitSubmit={handleHabitSubmit}
              />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard tasks={tasks} goals={goals} habits={habits} />
            </Suspense>
          } />
        </Routes>
      </div>

      {/* Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        isDangerous={confirmModal.isDangerous}
      />
    </Layout>
  );
}

// Componente principal com Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<PageLoader />}>
            <Welcome />
          </Suspense>
        } />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}
