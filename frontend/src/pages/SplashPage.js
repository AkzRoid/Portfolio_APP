

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/raydium-ray-logo.png';

function SplashPage() {
  useEffect(() => {
    document.title = 'Welcome';
  }, []);

  const navigate = useNavigate();
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 400);

    const redirectTimer = setTimeout(() => {
      navigate('/home', { replace: true });
    }, 2200);

    return () => {
      clearInterval(dotsTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const dotString = '.'.repeat(dotCount);

  return (
    <div>
      <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Loading...</title>
  <style dangerouslySetInnerHTML={{__html: "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n    }\n\n    body {\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n      background: linear-gradient(135deg, #000000 0%, #af2912 100%);\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      overflow: hidden;\n    }\n\n    .loader-container {\n      text-align: center;\n      color: white;\n    }\n\n    .logo {\n      margin-bottom: 30px;\n      animation: float 3s ease-in-out infinite;\n    }\n    \n    .logo img {\n      width: 100px;\n      height: 100px;\n      display: block;\n      margin: 0 auto;\n    }\n    @keyframes float {\n      0%, 100% {\n        transform: translateY(0);\n      }\n      50% {\n        transform: translateY(-20px);\n      }\n    }\n\n    h1 {\n      font-size: 42px;\n      margin-bottom: 20px;\n      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);\n    }\n\n    /* Spinner Animation */\n    .spinner {\n      width: 80px;\n      height: 80px;\n      border: 8px solid rgba(255, 255, 255, 0.3);\n      border-top: 8px solid white;\n      border-radius: 50%;\n      margin: 30px auto;\n      animation: spin 1s linear infinite;\n    }\n\n    @keyframes spin {\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n\n    .loading-text {\n      font-size: 20px;\n      margin-top: 20px;\n      color: rgba(255, 255, 255, 0.9);\n    }\n\n    .dots {\n      display: inline-block;\n      width: 30px;\n    }\n\n    /* Fade out animation */\n    .fade-out {\n      animation: fadeOut 0.6s ease-out forwards;\n    }\n\n    @keyframes fadeOut {\n      to {\n        opacity: 0;\n      }\n    }\n  " }} />  
  <div className="loader-container">
    <div className="logo"><img src={logo} alt="ray" /></div>
    <h1>Personal Portfolio</h1>
    <div className="spinner" />
    <div className="loading-text">
      Loading<span className="dots">{dotString}</span>
    </div>
  </div>
  
</div>

    );
}

export default SplashPage;
