import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Task, Goal, Habit, TaskType } from '../types';
import { Sparkles } from 'lucide-react';

interface DashboardProps {
  tasks: Task[];
  goals: Goal[];
  habits: Habit[];
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, goals, habits }) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const taskProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const typeData = [
    { name: 'Estudo', value: tasks.filter(t => t.type === TaskType.ESTUDO).length, color: '#7c3aed' },
    { name: 'Financeiro', value: tasks.filter(t => t.type === TaskType.FINANCEIRO).length, color: '#6d28d9' },
    { name: 'Normal', value: tasks.filter(t => t.type === TaskType.NORMAL).length, color: '#a78bfa' },
  ].filter(d => d.value > 0);

  const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg text-white hover:shadow-xl transition-all hover:scale-105`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-purple-200 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <Icon size={32} className="opacity-90" />
      </div>
      <p className="text-purple-300 text-sm">{subtext}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2 text-white">Bem-vindo de volta!</h1>
        <p className="text-purple-300 flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
          Acompanhe seu progresso em tempo real
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tarefas" 
          value={tasks.length} 
          subtext={`${completedTasks} concluídas`}
          icon={Sparkles}
          color="from-purple-600 to-purple-700"
        />
        <StatCard 
          title="Progresso" 
          value={`${taskProgress}%`}
          subtext="Do total de tarefas"
          icon={Sparkles}
          color="from-purple-500 to-purple-600"
        />
        <StatCard 
          title="Metas" 
          value={goals.length}
          subtext="Objetivos em progresso"
          icon={Sparkles}
          color="from-purple-400 to-purple-500"
        />
        <StatCard 
          title="Hábitos" 
          value={habits.length}
          subtext="Rotinas diárias"
          icon={Sparkles}
          color="from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Task Distribution */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-purple-900 mb-6">Distribuição de Tarefas</h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 text-sm mt-6 flex-wrap">
            {typeData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                <span className="text-purple-800 font-semibold">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-purple-900 mb-6">Progresso das Metas</h3>

          <div className="space-y-6">
            {goals.slice(0, 4).map(goal => {
              const percentage = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
              return (
                <div key={goal.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-purple-900">{goal.title}</span>
                    <span className="text-sm font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                      {percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-purple-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-purple-300 mt-1">
                    {new Date(goal.endDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              );
            })}

            {goals.length === 0 && (
              <div className="text-center py-12 text-purple-300">
                <p>Nenhuma meta criada ainda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
