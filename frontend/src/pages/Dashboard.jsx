import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Dashboard() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    api
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="auth-container">
      <div className="card dashboard">

        <h1>Dashboard</h1>

        <p>
          Bem-vindo,
          <strong> {user?.name}</strong>
        </p>

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;