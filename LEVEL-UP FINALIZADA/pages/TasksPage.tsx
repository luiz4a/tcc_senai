import React, { useState } from 'react';
import { Task, TaskType } from '../types';
import { Plus, Trash2, CheckCircle, Circle, Cpu } from 'lucide-react';

interface TasksPageProps {
  tasks: Task[];
  onAddTask: (task: any) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [filter, setFilter] = useState<'ALL' | TaskType>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Task Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState<TaskType>(TaskType.NORMAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({ title, description: desc, type, completed: false });
    setIsModalOpen(false);
    setTitle('');
    setDesc('');
    setType(TaskType.NORMAL);
  };

  const filteredTasks = tasks.filter(t => filter === 'ALL' || t.type === filter);

  const getTypeStyle = (t: TaskType) => {
    switch (t) {
      case TaskType.ESTUDO:
        return 'bg-purple-900/30 text-purple-300 border-purple-700 shadow-[0_0_8px_rgba(124,58,237,0.25)]';
      case TaskType.FINANCEIRO:
        return 'bg-purple-900/20 text-purple-300 border-purple-700 shadow-[0_0_8px_rgba(124,58,237,0.20)]';
      default:
        return 'bg-purple-900/15 text-purple-300 border-purple-700 shadow-[0_0_8px_rgba(124,58,237,0.20)]';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-8 shadow-xl">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-4xl font-bold text-purple-100 tracking-tight mb-2">Tarefas</h2>
            <p className="text-purple-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Organize suas atividades e aumente sua produtividade
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus size={20} />
            <span>Adicionar Tarefa</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex space-x-2 overflow-x-auto pb-3 scrollbar-thin">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            filter === 'ALL'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-purple-950/40 text-purple-500 hover:bg-purple-900/40'
          }`}
        >
          Todos
        </button>

        {Object.values(TaskType).map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              filter === t
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-purple-950/40 text-purple-500 hover:bg-purple-900/40'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-purple-950/40 rounded-2xl border border-purple-800">
            <Cpu className="text-purple-400 mb-4" size={56} />
            <p className="text-purple-200 text-lg font-medium">Nenhuma tarefa encontrada</p>
            <p className="text-purple-400 text-sm mt-1">Comece adicionando uma nova tarefa!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`group relative bg-purple-950/50 backdrop-blur-md p-6 rounded-xl border border-purple-800 transition-all duration-300 hover:bg-purple-900/50 hover:border-purple-700 ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`mt-1 flex-shrink-0 transition-all duration-300 ${
                    task.completed ? 'text-purple-400' : 'text-purple-500 hover:text-purple-400'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle size={24} className="fill-current text-purple-400/20" />
                  ) : (
                    <Circle size={24} strokeWidth={1.5} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3
                      className={`font-semibold text-lg transition-colors ${
                        task.completed
                          ? 'text-purple-500 line-through decoration-purple-700'
                          : 'text-purple-200'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getTypeStyle(
                        task.type
                      )}`}
                    >
                      {task.type}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      task.completed ? 'text-purple-400' : 'text-purple-300'
                    }`}
                  >
                    {task.description}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-2 text-purple-500 hover:text-purple-300 hover:bg-purple-900/30 rounded-lg transition-all border border-transparent hover:border-purple-600 flex-shrink-0"
                  title="Deletar tarefa"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700"></div>

            <h3 className="text-2xl font-bold text-purple-900 mb-6">Nova Tarefa</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-purple-700 mb-2">Título</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-purple-900 placeholder-purple-300 transition-all"
                  placeholder="Descreva sua tarefa..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-purple-700 mb-2">Descrição</label>
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-purple-900 placeholder-purple-300 transition-all resize-none"
                  rows={3}
                  placeholder="Adicione mais detalhes..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-purple-700 mb-2">Categoria</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as TaskType)}
                  className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none text-purple-900 appearance-none cursor-pointer transition-all"
                >
                  {Object.values(TaskType).map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 text-purple-700 hover:bg-purple-100 rounded-lg font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-xl"
                >
                  Criar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
