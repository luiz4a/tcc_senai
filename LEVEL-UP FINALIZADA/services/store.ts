import { Task, TaskType, Goal, Habit, User, AuthResponse } from '../types';

// Mock Data Keys
const KEYS = {
  USER: 'levelup_user',
  CUSTOM_USERS: 'levelup_custom_users', // Store registered users
  TASKS: 'levelup_tasks',
  GOALS: 'levelup_goals',
  HABITS: 'levelup_habits',
  INIT: 'levelup_initialized_v2' // Changed version to force re-seed
};

// Simulate Spring Boot "CommandLineRunner" Data Loader
export const initializeData = () => {
  if (localStorage.getItem(KEYS.INIT)) return;

  // Seed Tasks
  const initialTasks: Task[] = [
    {
      id: '1',
      title: 'Terminar Slide TCC',
      description: 'Finalizar a apresentação para a banca.',
      type: TaskType.ESTUDO,
      completed: false,
      createdAt: Date.now()
    },
    {
      id: '2',
      title: 'Estudar Java Spring',
      description: 'Revisar anotações sobre Security.',
      type: TaskType.ESTUDO,
      completed: true,
      createdAt: Date.now() - 86400000
    },
    {
      id: '3',
      title: 'Pagar Internet',
      description: 'Vencimento dia 15.',
      type: TaskType.FINANCEIRO,
      completed: false,
      createdAt: Date.now()
    }
  ];

  // Seed Goals (Updated Structure)
  const initialGoals: Goal[] = [
    { 
      id: '1', 
      title: 'Reserva de Emergência', 
      currentValue: 1500, 
      targetValue: 5000, 
      unit: 'R$', 
      startDate: '2024-01-01', 
      endDate: '2024-12-31' 
    },
    { 
      id: '2', 
      title: 'Ler Livros Técnicos', 
      currentValue: 2, 
      targetValue: 12, 
      unit: 'livros', 
      startDate: '2024-02-01', 
      endDate: '2024-08-30' 
    }
  ];

  // Seed Habits
  const initialHabits: Habit[] = [
    { id: '1', title: 'Beber 2L de água', streak: 5, lastCompletedDate: null },
    { id: '2', title: 'Commit no GitHub', streak: 12, lastCompletedDate: new Date().toISOString().split('T')[0] }
  ];

  localStorage.setItem(KEYS.TASKS, JSON.stringify(initialTasks));
  localStorage.setItem(KEYS.GOALS, JSON.stringify(initialGoals));
  localStorage.setItem(KEYS.HABITS, JSON.stringify(initialHabits));
  localStorage.setItem(KEYS.INIT, 'true');
};

// Auth Service (Unchanged logic, just simplified for brevity in this output if needed, keeping full implementation)
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    if (email === 'admin@levelup.com' && password === '123456') {
      const user: User = {
        id: 'u1',
        email,
        name: 'Admin User',
        token: 'jwt-fake-token-xyz-admin'
      };
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
      return { user, token: user.token };
    }

    const customUsersString = localStorage.getItem(KEYS.CUSTOM_USERS);
    if (customUsersString) {
      const customUsers = JSON.parse(customUsersString);
      const foundUser = customUsers.find((u: any) => u.email === email && u.password === password);
      if (foundUser) {
        const user: User = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          phone: foundUser.phone,
          token: `jwt-fake-token-${foundUser.id}`
        };
        localStorage.setItem(KEYS.USER, JSON.stringify(user));
        return { user, token: user.token };
      }
    }
    throw new Error('Credenciais inválidas');
  },

  register: async (name: string, email: string, password: string, phone: string): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (!email.includes('@')) throw new Error('Email inválido');
    if (password.length < 6) throw new Error('A senha deve ter no mínimo 6 caracteres');

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      phone
    };

    const existingUsers = JSON.parse(localStorage.getItem(KEYS.CUSTOM_USERS) || '[]');
    if (existingUsers.find((u: any) => u.email === email)) {
      throw new Error('Email já cadastrado');
    }
    existingUsers.push(newUser);
    localStorage.setItem(KEYS.CUSTOM_USERS, JSON.stringify(existingUsers));

    const userToReturn: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      token: `jwt-fake-token-${newUser.id}`
    };
    localStorage.setItem(KEYS.USER, JSON.stringify(userToReturn));
    
    return { user: userToReturn, token: userToReturn.token };
  },

  logout: () => {
    localStorage.removeItem(KEYS.USER);
  },
  getCurrentUser: (): User | null => {
    const u = localStorage.getItem(KEYS.USER);
    return u ? JSON.parse(u) : null;
  }
};

// Task Service
export const taskService = {
  getAll: (): Task[] => {
    return JSON.parse(localStorage.getItem(KEYS.TASKS) || '[]');
  },
  create: (task: Omit<Task, 'id' | 'createdAt'>): Task => {
    const tasks = taskService.getAll();
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    tasks.push(newTask);
    localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
    return newTask;
  },
  toggle: (id: string): Task[] => {
    const tasks = taskService.getAll();
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    localStorage.setItem(KEYS.TASKS, JSON.stringify(updated));
    return updated;
  },
  delete: (id: string): Task[] => {
    const tasks = taskService.getAll();
    const updated = tasks.filter(t => t.id !== id);
    localStorage.setItem(KEYS.TASKS, JSON.stringify(updated));
    return updated;
  }
};

// Goal Service (Updated)
export const goalService = {
  getAll: (): Goal[] => {
    return JSON.parse(localStorage.getItem(KEYS.GOALS) || '[]');
  },
  create: (goalData: Omit<Goal, 'id'>): Goal => {
    const goals = goalService.getAll();
    const newGoal: Goal = {
      ...goalData,
      id: crypto.randomUUID(),
    };
    goals.push(newGoal);
    localStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
    return newGoal;
  },
  updateProgress: (id: string, newValue: number): Goal[] => {
    const goals = goalService.getAll();
    const updated = goals.map(g => g.id === id ? { ...g, currentValue: newValue } : g);
    localStorage.setItem(KEYS.GOALS, JSON.stringify(updated));
    return updated;
  },
  update: (id: string, updatedFields: Partial<Goal>): Goal[] => {
    const goals = goalService.getAll();
    const updated = goals.map(g => g.id === id ? { ...g, ...updatedFields } : g);
    localStorage.setItem(KEYS.GOALS, JSON.stringify(updated));
    return updated;
  },
  delete: (id: string): Goal[] => {
    const goals = goalService.getAll();
    const updated = goals.filter(g => g.id !== id);
    localStorage.setItem(KEYS.GOALS, JSON.stringify(updated));
    return updated;
  }
};

// Habit Service (Updated)
export const habitService = {
  getAll: (): Habit[] => {
    return JSON.parse(localStorage.getItem(KEYS.HABITS) || '[]');
  },
  toggleToday: (id: string): Habit[] => {
    const habits = habitService.getAll();
    const today = new Date().toISOString().split('T')[0];
    
    const updated = habits.map(h => {
      if (h.id !== id) return h;
      
      const isDoneToday = h.lastCompletedDate === today;
      if (isDoneToday) {
        return { ...h, streak: Math.max(0, h.streak - 1), lastCompletedDate: null };
      } else {
        return { ...h, streak: h.streak + 1, lastCompletedDate: today };
      }
    });
    localStorage.setItem(KEYS.HABITS, JSON.stringify(updated));
    return updated;
  },
  create: (title: string): Habit => {
    const habits = habitService.getAll();
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title,
      streak: 0,
      lastCompletedDate: null
    };
    habits.push(newHabit);
    localStorage.setItem(KEYS.HABITS, JSON.stringify(habits));
    return newHabit;
  },
  update: (id: string, title: string): Habit[] => {
    const habits = habitService.getAll();
    const updated = habits.map(h => h.id === id ? { ...h, title } : h);
    localStorage.setItem(KEYS.HABITS, JSON.stringify(updated));
    return updated;
  },
  delete: (id: string): Habit[] => {
    const habits = habitService.getAll();
    const updated = habits.filter(h => h.id !== id);
    localStorage.setItem(KEYS.HABITS, JSON.stringify(updated));
    return updated;
  }
};