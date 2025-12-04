import React from 'react';
import { ArrowRight, Gem, Target, BarChart3, Trophy, Zap, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };
  const features = [
    {
      icon: Target,
      title: 'Metas Inteligentes',
      description: 'Defina objetivos claros e acompanhe seu progresso em tempo real com gráficos intuitivos.'
    },
    {
      icon: BarChart3,
      title: 'Análise Detalhada',
      description: 'Visualize suas tarefas, metas e hábitos com dashboards completos e métricas precisas.'
    },
    {
      icon: Zap,
      title: 'Hábitos Poderosos',
      description: 'Construa rotinas consistentes e acompanhe streaks para manter a motivação diária.'
    },
    {
      icon: Trophy,
      title: 'Gamificação',
      description: 'Ganhe experiência, desbloqueie conquistas e suba de nível conforme atinge seus objetivos.'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section com Fundo Animado */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Blobs Animados */}
          <div className="absolute inset-0">
            {/* Blob 1 - Violet */}
            <div 
              className="absolute w-96 h-96 bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-full blur-3xl"
              style={{
                top: '10%',
                left: '5%',
                animation: 'float 8s ease-in-out infinite',
              }}
            ></div>

            {/* Blob 2 - Purple */}
            <div 
              className="absolute w-80 h-80 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl"
              style={{
                top: '40%',
                right: '10%',
                animation: 'float 10s ease-in-out infinite',
                animationDelay: '2s',
              }}
            ></div>

            {/* Blob 3 - Blue */}
            <div 
              className="absolute w-72 h-72 bg-gradient-to-r from-blue-600/30 to-violet-600/30 rounded-full blur-3xl"
              style={{
                bottom: '10%',
                left: '10%',
                animation: 'float 12s ease-in-out infinite',
                animationDelay: '4s',
              }}
            ></div>

            {/* Blob 4 - Pink */}
            <div 
              className="absolute w-80 h-80 bg-gradient-to-r from-pink-600/30 to-red-600/30 rounded-full blur-3xl"
              style={{
                bottom: '20%',
                right: '5%',
                animation: 'float 9s ease-in-out infinite',
                animationDelay: '1s',
              }}
            ></div>
          </div>

          {/* Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Logo */}
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 mb-8 animate-float shadow-2xl shadow-purple-500/50">
            <Gem className="text-white" size={56} />
          </div>

          {/* Main Title */}
          <h1 className="text-7xl sm:text-8xl font-black text-white mb-8 tracking-tight drop-shadow-lg">
            LevelUp
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl text-white font-light mb-8 drop-shadow-md">
            Transforme seus objetivos em realidade
          </p>

          {/* Slogan */}
          <p className="text-lg sm:text-xl text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-light">
            Plataforma inteligente para acompanhamento de desempenho pessoal. 
            Organize suas tarefas, estabeleça metas desafiadoras e construa hábitos que transformam vidas. 
            Tudo em um só lugar.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleStart}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300 relative z-20"
          >
            Comece Agora
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Espaço em branco para separação */}
      <div className="h-8"></div>

      {/* Features Grid Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ferramentas completas para gerenciar sua vida, objetivos e desenvolvimento pessoal
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-100 p-8 hover:border-violet-300 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 cursor-pointer overflow-hidden"
              >
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-violet-600" size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 flex items-center gap-2 text-violet-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explorar
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Border Gradient on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secondary CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-3xl border border-violet-200/50 p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Crie sua conta agora e comece a transformar seus sonhos em objetivos concretos e alcançáveis.
          </p>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transform hover:scale-105 transition-all duration-300"
          >
            <CheckCircle2 size={20} />
            Começar Agora
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          © 2024 LevelUp. Transformando vidas através de objetivos inteligentes.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
