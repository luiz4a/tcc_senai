export enum TaskType {
  NORMAL = 'NORMAL',
  ESTUDO = 'ESTUDO',
  FINANCEIRO = 'FINANCEIRO'
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  token: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  completed: boolean;
  createdAt: number;
}

export interface Goal {
  id: string;
  title: string;
  currentValue: number;
  targetValue: number;
  unit: string; // ex: 'livros', 'kg', '%'
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface Habit {
  id: string;
  title: string;
  streak: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
}

export interface AuthResponse {
  user: User;
  token: string;
}