import React, { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function PaginaBemvindo() {
  const navigate = useNavigate();
  const [frase, setFrase] = useState('');

  useEffect(() => {
    const frasesInspiradoras = [
      "A jornada de mil milhas começa com um único passo.",
      "Não espere por oportunidades. Crie-as.",
      "Tudo parece impossível até que seja feito.",
      "Grandes conquistas começam com pequenos passos.",
      "Disciplina vence talento quando o talento não trabalha duro.",
      "O suor de hoje é a vitória de amanhã.",
      "A vida é 10% o que acontece com você e 90% como você reage a isso.",
      "Você é mais forte do que pensa e está mais perto do que imagina.",
      "Coragem não é a ausência do medo, é a decisão de que algo é mais importante do que o medo.",
    ];
    const aleatoria = frasesInspiradoras[Math.floor(Math.random() * frasesInspiradoras.length)];
    setFrase(aleatoria);
  }, []);

  return (
    <div className="pagina-bemvindo">
      <video autoPlay loop muted className="video-fundo-bemvindo">
        <source src="/videos/video-fundo.mp4" type="video/mp4" />
      </video>

      <div className="conteudo-bemvindo">
        <h1>Bem-vindo ao seu App de Tarefas 😁</h1>
        <p className="frase-inspiradora">"{frase}"</p>
        <button onClick={() => navigate('/cadastro')} className="botao-bemvindo">
          Entrar para o time!
        </button>
      </div>
    </div>
  );
}

export default PaginaBemvindo;
