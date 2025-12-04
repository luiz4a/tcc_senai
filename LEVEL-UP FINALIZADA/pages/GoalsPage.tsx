import React, { useState } from 'react';
import { Plus, Trash2, Check, X, Calendar, Target } from 'lucide-react';
import { Goal } from '../types';

interface GoalsPageProps {
  goals: Goal[];
  onAddGoal: (goal: any) => void;
  onDeleteGoal: (id: string) => void;
  onUpdateProgress: (goalId: string, currentVal: number) => void;
  onEditGoal?: (goal: Goal) => void;
  updateGoalId: string | null;
  updateGoalValue: string;
  setUpdateGoalValue: (value: string) => void;
  saveGoalProgress: (goalId: string) => void;
  isGoalModalOpen: boolean;
  setIsGoalModalOpen: (open: boolean) => void;
  onCloseGoalModal?: () => void;
  newGoal: any;
  setNewGoal: (goal: any) => void;
  handleGoalSubmit: (e: React.FormEvent) => void;
  editingGoalId?: string | null;
}

export default function GoalsPage({
  goals,
  onDeleteGoal,
  onUpdateProgress,
  onEditGoal,
  updateGoalId,
  updateGoalValue,
  setUpdateGoalValue,
  saveGoalProgress,
  isGoalModalOpen,
  setIsGoalModalOpen,
  newGoal,
  setNewGoal,
  handleGoalSubmit,
  editingGoalId,
  onCloseGoalModal,
}: GoalsPageProps) {
  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-2xl p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold mb-1">Metas</h2>
          <p className="text-purple-200">Defina e acompanhe seus objetivos</p>
        </div>
        <button 
          onClick={() => setIsGoalModalOpen(true)}
          className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={20} /> Nova Meta
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6">
        {goals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Target className="mx-auto text-purple-200 mb-4" size={56} />
            <p className="text-purple-300 text-lg">Nenhuma meta criada ainda</p>
            <p className="text-purple-300 mt-1">Comece definindo seus objetivos!</p>
          </div>
        ) : goals.map(goal => {
          const percentage = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
          const timeLeft = Math.ceil((new Date(goal.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={goal.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-900">{goal.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-purple-300 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          Até {new Date(goal.endDate).toLocaleDateString('pt-BR')}
                        </span>
                        {timeLeft > 0 && (
                          <span className="text-purple-500 font-semibold">{timeLeft} dias restantes</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onDeleteGoal(goal.id)} 
                        className="p-2 text-purple-300 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>

                      <button
                        onClick={() => onEditGoal && onEditGoal(goal)}
                        className="p-2 text-purple-300 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                        title="Editar Meta"
                      >
                        ✏️
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-purple-900">Progresso</span>
                      <span className="text-lg font-bold text-purple-600">{percentage}%</span>
                    </div>

                    <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-purple-500 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-sm text-purple-300 mt-2">
                      <span>{goal.currentValue} {goal.unit}</span>
                      <span>Meta: {goal.targetValue} {goal.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex gap-2 w-full md:w-auto">
                  {updateGoalId === goal.id ? (
                    <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg border border-purple-100 w-full md:w-auto">

                      <input 
                        autoFocus
                        type="number" 
                        value={updateGoalValue}
                        onChange={(e) => setUpdateGoalValue(e.target.value)}
                        className="flex-1 md:w-20 bg-transparent text-lg font-bold outline-none border-b border-purple-300 focus:border-purple-500 text-purple-900"
                        placeholder="0"
                      />

                      <span className="text-sm text-purple-300">{goal.unit}</span>

                      <button 
                        onClick={() => saveGoalProgress(goal.id)} 
                        className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                      >
                        <Check size={16} />
                      </button>

                      <button 
                        onClick={() => setUpdateGoalValue('')} 
                        className="text-purple-300 p-2 hover:text-purple-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => onUpdateProgress(goal.id, goal.currentValue)}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Atualizar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-500"></div>

            <h3 className="text-2xl font-bold text-purple-900 mb-6">
              {editingGoalId ? 'Editar Meta' : 'Nova Meta'}
            </h3>

            <form onSubmit={handleGoalSubmit} className="space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Título da Meta</label>
                <input 
                  required 
                  type="text" 
                  value={newGoal.title} 
                  onChange={e => setNewGoal({...newGoal, title: e.target.value})} 
                  className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300"
                  placeholder="Ex: Juntar R$ 10.000"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Valor Alvo</label>
                  <input 
                    required 
                    type="number" 
                    value={newGoal.targetValue} 
                    onChange={e => setNewGoal({...newGoal, targetValue: e.target.value})} 
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300"
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Unidade</label>
                  <input 
                    type="text" 
                    value={newGoal.unit} 
                    onChange={e => setNewGoal({...newGoal, unit: e.target.value})} 
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900 placeholder-purple-300"
                    placeholder="R$"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Início</label>
                  <input 
                    required 
                    type="date" 
                    value={newGoal.startDate} 
                    onChange={e => setNewGoal({...newGoal, startDate: e.target.value})} 
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prazo</label>
                  <input 
                    required 
                    type="date" 
                    value={newGoal.endDate} 
                    onChange={e => setNewGoal({...newGoal, endDate: e.target.value})} 
                    className="w-full px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-purple-900"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => { onCloseGoalModal ? onCloseGoalModal() : setIsGoalModalOpen(false); }} 
                  className="flex-1 py-2.5 text-purple-700 hover:bg-purple-50 rounded-lg font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>

                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold rounded-lg text-sm transition-all shadow-lg hover:shadow-xl"
                >
                  {editingGoalId ? 'Salvar' : 'Criar Meta'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
