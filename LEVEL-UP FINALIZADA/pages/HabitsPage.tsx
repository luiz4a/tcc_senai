import React from 'react';
import { Plus, Trash2, Edit2, Check, X, Flame, Activity } from 'lucide-react';
import { Habit } from '../types';

interface HabitsPageProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onEditHabit: (habit: Habit) => void;
  isHabitModalOpen: boolean;
  setIsHabitModalOpen: (open: boolean) => void;
  habitFormTitle: string;
  setHabitFormTitle: (title: string) => void;
  handleHabitSubmit: (e: React.FormEvent) => void;
}

export default function HabitsPage({
  habits,
  onToggleHabit,
  onDeleteHabit,
  onEditHabit,
  isHabitModalOpen,
  setIsHabitModalOpen,
  habitFormTitle,
  setHabitFormTitle,
  handleHabitSubmit,
}: HabitsPageProps) {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-2xl p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold mb-1">Hábitos</h2>
          <p className="text-white/80">Construa sua rotina diária</p>
        </div>
        <button 
          onClick={() => {
            setHabitFormTitle('');
            setIsHabitModalOpen(true);
          }}
          className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={20} /> Novo Hábito
        </button>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm">
            <Activity className="mx-auto text-purple-200 mb-4" size={56} />
            <p className="text-purple-200 text-lg">Nenhum hábito criado ainda</p>
            <p className="text-purple-200 mt-1">Comece criando novos hábitos!</p>
          </div>
        ) : habits.map(habit => {
          const isDoneToday = habit.lastCompletedDate === new Date().toISOString().split('T')[0];
          return (
            <div key={habit.id} className="group relative">
              {/* Habit Card */}
              <div 
                onClick={() => onToggleHabit(habit.id)} 
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between min-h-[160px] ${
                  isDoneToday 
                  ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300' 
                  : 'bg-white border-purple-100 hover:border-purple-300 hover:shadow-lg'
                }`}
              >
                {/* Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEditHabit(habit); }} 
                    className="p-2 bg-white text-purple-700 hover:text-white hover:bg-purple-600 rounded-lg border border-purple-100 hover:border-purple-300 transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDeleteHabit(habit.id); }} 
                    className="p-2 bg-white text-purple-700 hover:text-white hover:bg-purple-600 rounded-lg border border-purple-100 hover:border-purple-300 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Title */}
                <div className="pr-20">
                  <h3 className={`font-bold text-lg ${isDoneToday ? 'text-purple-700 line-through' : 'text-purple-900'}`}>
                    {habit.title}
                  </h3>
                </div>

                {/* Bottom Stats */}
                <div className="flex items-end justify-between mt-auto">
                  {/* Streak */}
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${isDoneToday ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-300'}`}>
                      <Flame size={20} className={isDoneToday ? 'fill-current' : ''} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-900">{habit.streak}</div>
                      <div className="text-xs text-purple-200 font-semibold">dias</div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${isDoneToday ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700'}`}>
                    {isDoneToday ? (
                      <>
                        <Check size={14} /> Feito
                      </>
                    ) : (
                      'Pendente'
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Habit Modal */}
      {isHabitModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-500"></div>
            
            <h3 className="text-2xl font-bold text-purple-900 mb-6">Novo Hábito</h3>
            <form onSubmit={handleHabitSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Hábito</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={habitFormTitle} 
                  onChange={(e) => setHabitFormTitle(e.target.value)} 
                  className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg text-purple-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-purple-300"
                  placeholder="Ex: Ler 10 páginas"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsHabitModalOpen(false)} 
                  className="flex-1 py-2.5 text-purple-700 hover:bg-purple-50 rounded-lg font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-500 text-white font-bold rounded-lg text-sm transition-all shadow-lg hover:shadow-xl"
                >
                  Criar Hábito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
