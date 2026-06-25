import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Usuário criado com sucesso!");

      navigate("/");
    } catch {
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <div className="auth-container">
      <div className="card">

        <h1>Criar Conta</h1>
        <p>Cadastre-se gratuitamente</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Cadastrar
          </button>

        </form>

        <span>
          Já possui conta?
          <Link to="/"> Fazer Login</Link>
        </span>

      </div>
    </div>
  );
}

export default Register;