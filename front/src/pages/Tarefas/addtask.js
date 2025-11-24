import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css"; 

export default function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL (se existir)
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

  // Efeito para carregar dados se for EDIÇÃO
  useEffect(() => {
    if (id) {
      const tarefasSalvas = JSON.parse(localStorage.getItem("minhasMetas")) || [];
      const tarefaEncontrada = tarefasSalvas.find((t) => t.id === parseInt(id));
      
      if (tarefaEncontrada) {
        setTitle(tarefaEncontrada.title);
        setDescription(tarefaEncontrada.description || ""); // Garante que não quebre se não tiver desc
        setProgress(tarefaEncontrada.progress);
      }
    }
  }, [id]);

  const handleSalvar = (e) => {
    e.preventDefault();

    // 1. Ler o banco de dados atual
    const tarefasAtuais = JSON.parse(localStorage.getItem("minhasMetas")) || [];
    let novasTarefas;

    if (id) {
      // --- MODO EDIÇÃO: Atualiza a tarefa existente ---
      novasTarefas = tarefasAtuais.map((t) => {
        if (t.id === parseInt(id)) {
          return { ...t, title, description, progress };
        }
        return t;
      });
    } else {
      // --- MODO CRIAÇÃO: Adiciona nova ---
      const novaMeta = {
        id: Date.now(),
        title,
        description,
        progress: 0, // Nova começa com 0%
        subtasks: 0
      };
      novasTarefas = [...tarefasAtuais, novaMeta];
    }

    // 2. Salvar no LocalStorage
    localStorage.setItem("minhasMetas", JSON.stringify(novasTarefas));

    // 3. Voltar para Home
    navigate("/tarefas");
  };

  return (
    <div className="levelup-container">
       {/* Mantivemos estrutura simples para focar na lógica */}
       <main className="conteudo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <div className="card-tarefa" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            
            <h2 style={{ color: '#fff', marginBottom: '1rem' }}>
              {id ? "Editar Meta" : "Nova Meta"}
            </h2>
            
            <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ color: '#aaa' }}>Nome</label>
                <input 
                  className="input-pesquisa"
                  style={{ width: '100%', padding: '10px' }}
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                />
              </div>

              <div>
                <label style={{ color: '#aaa' }}>Descrição</label>
                <textarea 
                  className="input-pesquisa"
                  style={{ width: '100%', padding: '10px', height: '80px' }}
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>

              {/* Mostra controle de progresso apenas se for edição */}
              {id && (
                <div>
                  <label style={{ color: '#aaa' }}>Progresso: {progress}%</label>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={progress} 
                    onChange={(e) => setProgress(Number(e.target.value))}
                    style={{ width: '100%' }} 
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                 <button type="button" onClick={() => navigate('/tarefas')} className="botao-tarefas-livre">
                   Cancelar
                 </button>
                 <button 
                    type="submit" 
                    className="botao-nova"
                    style={{ flex: 1 }}
                >
                    Salvar
                </button>
              </div>
            </form>
         </div>
       </main>
    </div>
  );
}