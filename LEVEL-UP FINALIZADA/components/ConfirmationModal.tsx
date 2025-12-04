import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDangerous = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[1000] backdrop-blur-sm animate-fade-in">
        <div className={`bg-purple-900 border rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in relative overflow-hidden ${
          isDangerous ? 'border-purple-700/50' : 'border-purple-600/50'
        }`}>
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
            isDangerous 
              ? 'from-purple-700 via-purple-600 to-purple-700' 
              : 'from-purple-600 via-purple-500 to-purple-600'
          }`}></div>
          
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-2 text-purple-300 hover:text-white hover:bg-purple-800 rounded-lg transition-all"
          >
            <X size={18} />
          </button>

          <div className="flex gap-4">
            {isDangerous && (
              <div className="flex-shrink-0 mt-1">
                <AlertTriangle className="text-purple-400 animate-pulse" size={28} />
              </div>
            )}
            
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-2 ${isDangerous ? 'text-purple-300' : 'text-white'}`}>
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-white/5 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-medium text-sm uppercase tracking-wide transition-colors border border-transparent hover:border-slate-700"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 text-white rounded-lg font-bold text-sm uppercase tracking-wide transition-all border ${
                isDangerous
                  ? 'bg-purple-700 hover:bg-purple-600 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] border-purple-600/30'
                  : 'bg-purple-600 hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] border-purple-500/30'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
