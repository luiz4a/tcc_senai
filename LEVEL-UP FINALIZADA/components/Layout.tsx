import React from 'react';
import { LayoutDashboard, CheckSquare, Target, Activity, LogOut, Menu, X, Gem } from 'lucide-react';
import { User } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ path, icon: Icon, label }: { path: string, icon: any, label: string }) => {
    const isActive = location.pathname === path;
    return (
      <button
        onClick={() => {
          navigate(path);
          setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-white bg-opacity-10 text-white shadow-lg'
            : 'text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-5'
        }`}
      >
        <Icon size={20} />
        <span className="font-semibold">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 border-r border-purple-800 fixed h-full z-10 shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-purple-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-lg">
              <Gem className="text-purple-900" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">LevelUp</h1>
              <p className="text-xs text-purple-200 font-semibold">Personal Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem path="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem path="/tasks" icon={CheckSquare} label="Tarefas" />
          <NavItem path="/goals" icon={Target} label="Metas" />
          <NavItem path="/habits" icon={Activity} label="Hábitos" />
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-purple-800 bg-purple-900 bg-opacity-20">
          <div className="flex items-center space-x-3 px-4 py-3 mb-3 rounded-lg bg-white bg-opacity-5 border border-purple-700">
            <div className="w-10 h-10 rounded-full bg-white text-purple-900 flex items-center justify-center font-bold shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-purple-200 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-white hover:bg-white hover:bg-opacity-5 rounded-lg transition-colors text-sm font-semibold"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-white border-b border-gray-200 z-20 flex items-center justify-between p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg">
            <Gem className="text-white" size={20} />
          </div>
          <h1 className="text-lg font-bold text-gray-900">LevelUp</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-10 pt-20 px-4 space-y-2 overflow-y-auto">
          <NavItem path="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem path="/tasks" icon={CheckSquare} label="Tarefas" />
          <NavItem path="/goals" icon={Target} label="Metas" />
          <NavItem path="/habits" icon={Activity} label="Hábitos" />
          <div className="border-t border-gray-200 pt-4 mt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 bg-red-50 rounded-lg font-semibold"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-6 md:p-8 pt-20 md:pt-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;