import React from "react";
import "./styles.css"; // Importa o CSS da página

export default function Home() {
  const tasks = [
    { id: 1, title: "Estudar React", progress: 50, subtasks: 3 },
    { id: 2, title: "Projeto de Energia", progress: 10, subtasks: 1 },
    { id: 3, title: "Reunião Klabin", progress: 85, subtasks: 5 },
  ];

  const mediaProgresso = Math.round(
    tasks.reduce((s, t) => s + t.progress, 0) / tasks.length
  );

  return (
    <div className="levelup-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">LU</div>
          <div>
            <div className="titulo">LEVEL UP</div>
            <div className="subtitulo">Seu painel</div>
          </div>
        </div>

        <nav className="menu">
          {[
            "Home",
            "Adicionar Tarefa",
            "Metas",
            "Calendário",
            "Pesquisa",
            "Categorias",
            "Modelos",
            "Lixeira",
            "Metas Diárias",
          ].map((item) => (
            <a key={item} href="#" className="menu-item">
              <span className="dot"></span>
              {item}
            </a>
          ))}
        </nav>

        <div className="usuario">
          <span className="label">Usuária</span>
          <span className="nome">Maria Dias</span>
        </div>
      </aside>

      {/* Main */}
      <main className="conteudo">
        <header className="topo">
          <h1>Minhas Tarefas</h1>
          <div className="acoes">
            <input placeholder="Pesquisar" className="input-pesquisa" />
            <button className="botao-nova">Nova</button>
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
                  <p>{t.subtasks} subtarefas</p>
                </div>
                <span className="progresso">{t.progress}%</span>
              </div>

              <div className="barra-progresso">
                <div
                  className="progresso-preenchido"
                  style={{ width: `${t.progress}%` }}
                ></div>
              </div>

              <div className="acoes-card">
                <button className="botao-secundario">Abrir</button>
                <button className="botao-primario">Editar</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
