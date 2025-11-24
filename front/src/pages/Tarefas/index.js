import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles.css";

export default function Home() {
  const navigate = useNavigate(); 

  const [isOpen, setIsOpen] = React.useState(false); // controla o drawer

  const [tasks, setTasks] = React.useState(() => {
    const salvos = localStorage.getItem("minhasMetas");
    return salvos ? JSON.parse(salvos) : []; 
  });

  const mediaProgresso = tasks.length
    ? Math.round(tasks.reduce((s, t) => s + t.progress, 0) / tasks.length)
    : 0;

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Metas", path: "/metas" },
  ];

  return (
    <div className="levelup-container">

    <button
  className={`btn-open-menu ${isOpen ? "open-icon sidebar-open" : "closed-icon"}`}
  onClick={() => setIsOpen(!isOpen)}
></button>
      {/* BACKDROP (FECHA O MENU AO CLICAR FORA) */}
      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)}></div>}

      {/* SIDEBAR GAVETA */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          
          <div>
            <div className="titulo">LEVEL UP</div>
            <div className="subtitulo">Maria Dias</div>
          </div>
        </div>

        <nav className="menu">
          {menuItems.map((item) => (
            <button 
              key={item.label} 
              className="menu-item"
              onClick={() => { 
                navigate(item.path);
                setIsOpen(false); // fechar menu ao navegar
              }}
            >
              <span className="dot"></span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="usuario">
          <span className="nome">Maria Dias</span>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo">
        <header className="topo">
          <h1>Minhas Tarefas</h1>
          <div className="acoes">
            <button className="botao-nova" onClick={() => navigate('/add-task')}>
              Adicionar Tarefa +
            </button>
          </div>
        </header>

        {/* Estatísticas */}
        <section className="estatisticas">
          <div className="card-info">
            <span>Tarefas</span>
            <h2>{tasks.length}</h2>
          </div>
          <div className="card-info">
            <span>Progresso médio</span>
            <h2>{mediaProgresso}%</h2>
          </div>
          <div className="card-info">
            <span>Subtarefas</span>
            <h2>{tasks.reduce((s, t) => s + t.subtasks, 0)}</h2>
          </div>
        </section>

        {/* Cards */}
        <section className="tarefas">
          {tasks.map((t) => (
            <div key={t.id} className="card-tarefa">
              <div className="cabecalho-card">
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p> 
                </div>
                <span className="progresso">{t.progress}%</span>
              </div>

              <div className="barra-progresso">
                <div className="progresso-preenchido" style={{ width: `${t.progress}%` }}></div>
              </div>

              <div className="metas-card">
                <button 
                  className="botao-tarefas-livre" 
                  onClick={() => navigate(`/editar-meta/${t.id}`)}
                >
                  Editar
                </button>

                <button 
                  className="botao-tarefas-livre"
                  style={{ background: '#ff4444', color: 'white' }}
                  onClick={() => {
                    if(window.confirm("Deletar esta meta?")) {
                      const novas = tasks.filter(task => task.id !== t.id);
                      setTasks(novas); 
                      localStorage.setItem("minhasMetas", JSON.stringify(novas)); 
                    }
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
