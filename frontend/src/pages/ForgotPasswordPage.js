import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const ForgotPasswordPage = () => {
  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/auth/forgot-password', { email });
      setMessage(response.data.message || 'Password reset link sent to your email!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process request. Please try again.');
    } finally {
      setLoading(false);
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
          }}>Reset Password</h1>
          <p style={{ fontSize: "16px", opacity: "0.9" }}>Enter your email to receive a reset link</p>
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

        {message && (
          <p style={{
            color: "#51cf66",
            backgroundColor: "rgba(81, 207, 102, 0.1)",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
            border: "1px solid #51cf66"
          }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Enter your registered email"
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

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: loading ? "#666" : "#af2912",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
              boxSizing: "border-box",
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#8b1f0f")}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#af2912")}
            onFocus={(e) => !loading && (e.target.style.backgroundColor = "#8b1f0f")}
            onBlur={(e) => !loading && (e.target.style.backgroundColor = "#af2912")}
          >
            {loading ? 'Processing...' : 'Send Reset Link'}
          </button>
        </form>

        <p style={{ fontSize: "14px", opacity: "0.8" }}>
          Remember your password?{" "}
          <Link
            to="/login"
            style={{
              color: "#af2912",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
