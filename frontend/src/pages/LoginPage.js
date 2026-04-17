//frontend/src/pages/LoginPage.js
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      // Redirect based on role
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #000000 0%, #af2912 100%)",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "40px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{
            fontSize: "36px",
            marginBottom: "10px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
          }}>Welcome Back</h1>
          <p style={{ fontSize: "16px", opacity: "0.9" }}>Sign in to your account</p>
        </div>

        {error && (
          <p style={{
            color: "#ff6b6b",
            backgroundColor: "rgba(255, 107, 107, 0.1)",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
            border: "1px solid #ff6b6b"
          }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#af2912",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              boxSizing: "border-box"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#8b1f0f"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#af2912"}
            onFocus={(e) => e.target.style.backgroundColor = "#8b1f0f"}
            onBlur={(e) => e.target.style.backgroundColor = "#af2912"}
          >
            Login
          </button>
        </form>

        <p style={{ fontSize: "14px", opacity: "0.8" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#af2912",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Register here
          </Link>
        </p>

        <p style={{ fontSize: "14px", opacity: "0.8" }}>
          <Link
            to="/forgot-password"
            style={{
              color: "#af2912",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;