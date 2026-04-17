import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const ResetPasswordPage = () => {
  useEffect(() => {
    document.title = 'Reset Password - My Portfolio';
  }, []);

  const { resetToken: resetCode } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isValidCode, setIsValidCode] = useState(null);
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();

  // Verify reset code when page loads
  useEffect(() => {
    const verifyResetCode = async () => {
      if (!resetCode) {
        setError('No reset code found. Invalid link.');
        setIsValidCode(false);
        setVerifying(false);
        return;
      }

      console.log('🔍 Reset code from URL:', resetCode.substring(0, 20) + '...');

      try {
        await axios.get(`/auth/verify-reset/${resetCode}`);
        setIsValidCode(true);
      } catch (err) {
        setError(err.response?.data?.message || 'This reset link is invalid or has expired.');
        setIsValidCode(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyResetCode();
  }, [resetCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate passwords
    if (!isValidCode) {
      setError('This reset link is invalid or has expired. Please request a new one.');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      console.log('📤 Sending reset password request with code:', resetCode?.substring(0, 20) + '...');
      
      await axios.post('/auth/reset-password', {
        resetCode,
        newPassword
      });
      setSuccess(true);
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('❌ Error:', err.response?.data?.message);
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
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
          }}>Create New Password</h1>
          <p style={{ fontSize: "16px", opacity: "0.9" }}>Enter your new password below</p>
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

        {verifying ? (
          <p style={{ color: "#fff", marginBottom: "20px" }}>
            Verifying reset link...
          </p>
        ) : isValidCode ? (
          !success && (
            <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          )
        ) : (
          <p style={{
            color: "#ff6b6b",
            marginBottom: "20px",
            lineHeight: 1.5
          }}>
            This reset link is no longer valid. Please request a new password reset link.
          </p>
        )}

        <p style={{ fontSize: "14px", opacity: "0.8" }}>
          <Link
            to="/login"
            style={{
              color: "#af2912",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
