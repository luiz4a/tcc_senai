// src/components/FormularioCadastro/index.js

import { useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import logo from '../../assets/images/lvlup-icon-re.png';
import axios from 'axios';

function FormularioCadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { exibirMensagem , mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();

    const cadastrarUsuario = async () => {
        try {
            const response = await axios.post('http://localhost:8080/usuarios', {nome, email, telefone, senha});
            exibirMensagem(response.data.mensagem || 'Usuário cadastrado com sucesso!', 'sucesso');
            setNome('');
            setEmail('');
            setTelefone('');
            setSenha('');
            setTimeout(()=>{
                navigate('/tarefas');
            }, 2500);
        } catch (error) {
            let erroMsg = 'Erro ao conectar ao servidor.';
            if (error.response && error.response.data) {
                erroMsg = error.response.data.mensagem;
                if (error.response.data.erros) {
                    erroMsg += ' ' + Object.values(error.response.data.erros).join(', ');
                }
            }
            exibirMensagem(erroMsg, 'erro');
        }
    }

    return (
        <div className="pagina-cadastro">
            <video autoPlay loop muted className="video-fundo">
                <source src="/videos/video-fundo.mp4" type="video/mp4" />
            </video>

            <div className="container">
                <img src={logo} style={{ marginBottom: 0 }} alt="Logo da empresa" />
                <h2>Cadastro de usuário</h2>
                <form onSubmit={(e) => { e.preventDefault(); cadastrarUsuario() }}>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                    <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    <button type="submit">Cadastrar</button>
                </form>

                <button onClick={() => navigate('/usuarios')} className="link-usuarios">
                    Ver usuários cadastrados
                </button>

                <MensagemFeedback
                    mensagem={mensagem}
                    tipo={tipoMensagem}
                    visivel={visivel}
                    onclose={fecharMensagem}
                />
            </div>
        </div>
    );
}

export default FormularioCadastro;
