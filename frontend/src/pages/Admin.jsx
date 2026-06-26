import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";
import "./admin.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/dashboard");
      return;
    }
    api.get("/auth/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setUsers(res.data))
    .catch(() => alert("Acesso negado"));
  }, [navigate]);

  async function updateRole(id, role) {
    const token = localStorage.getItem("token");
    try {
      await api.put(`/auth/users/${id}`, { role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map(u => u.id === id ? { ...u, role } : u));
      alert("Permissão atualizada!");
    } catch {
      alert("Erro ao atualizar");
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>👑 Administração de Usuários</h1>
        <p className="subtitle">Gerencie permissões e funções dos usuários</p>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Nome</th><th>Email</th><th>Role</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-badge ${u.role}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <button className="btn btn-admin" onClick={() => updateRole(u.id, "admin")}>
                    Tornar Admin
                  </button>
                  <button className="btn btn-user" onClick={() => updateRole(u.id, "user")}>
                    Tornar User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botão de voltar */}
        <div className="back-btn-container">
          <button className="btn btn-back" onClick={() => navigate("/dashboard")}>
            ← Voltar para Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
export default Admin;
