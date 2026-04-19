//frontend/src/pages/RegisterPage.js
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const RegisterPage = () => {
  useEffect(() => {
    document.title = 'Register';
  }, []);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
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
          }}>Create Account</h1>
          <p style={{ fontSize: "16px", opacity: "0.9" }}>Join us today</p>
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
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
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
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              placeholder="Password (min 6 characters)"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
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
            Register
          </button>
        </form>

        <p style={{ fontSize: "14px", opacity: "0.8" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#af2912",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;