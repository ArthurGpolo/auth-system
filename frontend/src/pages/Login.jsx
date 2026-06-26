import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      navigate("/dashboard");
    } catch {
      alert("Email ou senha inválidos");
    }
  }

  return (
    <div className="auth-container">
      <div className="card">
        <h1>Bem-vindo 👋</h1>
        <p>Faça login para continuar</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Seu email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Sua senha"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Entrar</button>
        </form>
        <span>
          Não possui conta? <Link to="/register"> Criar conta</Link>
        </span>
      </div>
    </div>
  );
}
export default Login;
