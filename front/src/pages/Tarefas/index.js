import React from "react";
import { useNavigate } from "react-router-dom"; // Adicione esta linha no topo para navegação
import "./styles.css"; // Importa o CSS da página

export default function Home() {
  const navigate = useNavigate(); // Adicione esta linha dentro do componente para usar navegação

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
            <div className="subtitulo">Maria Dias</div>
          </div>
        </div>

        <nav className="menu">
          {[
            "Home",
            "Metas",
            "Calendário",
            "Categorias",
            "Modelos",
            "Lixeira",
            "Metas Diárias",
          ].map((item) => (
            // Alterado de <a> para <button>
            // Removido href="#"
            // Adicionado type="button" (boas práticas)
            <button key={item} type="button" className="menu-item">
              <span className="dot"></span>
              {item}
            </button>
          ))}
        </nav>

        <div className="usuario">
          <span className="nome"></span>
        </div>
      </aside>

      {/* Main */}
      <main className="conteudo">
        <header className="topo">
          <h1>Minhas Tarefas</h1>
          <div className="acoes">
            {/* <input placeholder="Pesquisar" className="input-pesquisa" /> */}
            {/* Modificação: Adicione onClick para navegar para a página de criação de tarefas */}
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