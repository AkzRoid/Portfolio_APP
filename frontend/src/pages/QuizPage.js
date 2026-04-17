import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
    useEffect(() => {
        document.title = 'Quiz';
    }, []);

    const navigate = useNavigate();
    return (
       <div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quiz Game</title>
  <link rel="stylesheet" href="style.css" />
  <style dangerouslySetInnerHTML={{__html: "\n        .quiz-container {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            min-height: calc(100vh - 200px);\n            padding: 2rem;\n            max-width: 900px;\n            margin: 0 auto;\n        }\n\n        .quiz-header {\n            text-align: center;\n            margin-bottom: 2rem;\n            width: 100%;\n        }\n\n        .quiz-header h1 {\n            font-size: 3rem;\n            margin-bottom: 1rem;\n            color: var(--text-color);\n        }\n\n        /* File Upload Section */\n        .upload-section {\n            width: 100%;\n            background: linear-gradient(135deg, rgba(183, 75, 75, 0.1), rgba(0, 0, 0, 0.05));\n            padding: 2rem;\n            border-radius: 1rem;\n            margin-bottom: 2rem;\n            border: 2px dashed var(--btn-bg);\n        }\n\n        .upload-section h2 {\n            font-size: 1.8rem;\n            margin-bottom: 1.5rem;\n            color: var(--text-color);\n        }\n\n        .file-input-wrapper {\n            position: relative;\n            display: inline-block;\n            width: 100%;\n        }\n\n        .file-input-wrapper input[type=\"file\"] {\n            display: none;\n        }\n\n        .file-input-label {\n            display: block;\n            padding: 1rem 2rem;\n            background-color: var(--btn-bg);\n            color: white;\n            border-radius: 0.5rem;\n            cursor: pointer;\n            text-align: center;\n            font-size: 1.6rem;\n            font-weight: 600;\n            transition: all 0.3s ease;\n            margin-bottom: 1rem;\n        }\n\n        .file-input-label:hover {\n            background-color: var(--btn-hover);\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(183, 75, 75, 0.3);\n        }\n\n        .file-info {\n            font-size: 1.4rem;\n            color: rgba(255, 255, 255, 0.7);\n            margin-bottom: 1rem;\n        }\n\n        .question-count-input {\n            display: flex;\n            gap: 1rem;\n            margin-bottom: 1rem;\n            flex-wrap: wrap;\n            align-items: center;\n        }\n\n        .question-count-input label {\n            font-size: 1.4rem;\n            color: var(--text-color);\n        }\n\n        .question-count-input input {\n            padding: 0.8rem 1rem;\n            font-size: 1.4rem;\n            border: 1px solid var(--btn-bg);\n            border-radius: 0.5rem;\n            background-color: var(--bg-color);\n            color: var(--text-color);\n            width: 100px;\n        }\n\n        .generate-btn {\n            width: 100%;\n            padding: 1.2rem 2rem;\n            background-color: #10b981;\n            color: white;\n            border: none;\n            border-radius: 0.5rem;\n            font-size: 1.6rem;\n            font-weight: 600;\n            cursor: pointer;\n            transition: all 0.3s ease;\n            pointer-events: auto;\n        }\n\n        .generate-btn:hover:not(:disabled) {\n            background-color: #059669;\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);\n        }\n\n        .generate-btn:disabled {\n            opacity: 0.5;\n            cursor: default;\n        }\n\n        /* Quiz Display Section */\n        .quiz-display {\n            display: none;\n            width: 100%;\n        }\n\n        .quiz-display.active {\n            display: block;\n        }\n\n        .quiz-progress {\n            width: 100%;\n            margin-bottom: 2rem;\n            text-align: center;\n            color: var(--text-color);\n        }\n\n        .progress-bar {\n            width: 100%;\n            height: 8px;\n            background-color: rgba(255, 255, 255, 0.2);\n            border-radius: 10px;\n            margin: 1rem 0;\n            overflow: hidden;\n        }\n\n        .progress-fill {\n            height: 100%;\n            background-color: var(--btn-bg);\n            transition: width 0.3s ease;\n        }\n\n        .question-card {\n            background: linear-gradient(135deg, rgba(183, 75, 75, 0.1), rgba(0, 0, 0, 0.05));\n            border-radius: 1rem;\n            padding: 2rem;\n            margin-bottom: 2rem;\n            width: 100%;\n        }\n\n        .question-text {\n            font-size: 1.8rem;\n            margin-bottom: 2rem;\n            color: var(--text-color);\n            font-weight: 600;\n        }\n\n        .answer-options {\n            display: flex;\n            flex-direction: column;\n            gap: 1rem;\n        }\n\n        .answer-btn {\n            padding: 1rem 1.5rem;\n            font-size: 1.4rem;\n            border: 2px solid var(--btn-bg);\n            border-radius: 0.5rem;\n            background-color: transparent;\n            color: var(--text-color);\n            cursor: pointer;\n            transition: all 0.3s ease;\n            text-align: left;\n        }\n\n        .answer-btn:hover {\n            background-color: var(--btn-bg);\n            color: white;\n            transform: translateX(5px);\n        }\n\n        .answer-btn.selected {\n            background-color: var(--btn-bg);\n            color: white;\n        }\n\n        .answer-btn.correct {\n            background-color: #10b981;\n            border-color: #10b981;\n            color: white;\n        }\n\n        .answer-btn.incorrect {\n            background-color: #ef4444;\n            border-color: #ef4444;\n            color: white;\n        }\n\n        .answer-btn:disabled {\n            cursor: not-allowed;\n        }\n\n        .next-btn {\n            padding: 1rem 2rem;\n            font-size: 1.6rem;\n            background-color: var(--btn-bg);\n            color: white;\n            border: none;\n            border-radius: 0.5rem;\n            cursor: pointer;\n            transition: all 0.3s ease;\n            display: none;\n            margin-top: 1rem;\n        }\n\n        .next-btn.show {\n            display: block;\n        }\n\n        .next-btn:hover {\n            background-color: var(--btn-hover);\n            transform: translateY(-2px);\n        }\n\n        /* Results Section */\n        .results-section {\n            display: none;\n            text-align: center;\n            width: 100%;\n        }\n\n        .results-section.active {\n            display: block;\n        }\n\n        .score-display {\n            font-size: 4rem;\n            font-weight: 700;\n            color: var(--btn-bg);\n            margin: 2rem 0;\n        }\n\n        .score-percentage {\n            font-size: 2rem;\n            color: var(--text-color);\n            margin-bottom: 2rem;\n        }\n\n        .button-group {\n            display: flex;\n            gap: 1rem;\n            justify-content: center;\n            flex-wrap: wrap;\n            margin-top: 2rem;\n        }\n\n        .reset-btn, .back-btn {\n            padding: 1rem 2rem;\n            font-size: 1.6rem;\n            font-weight: 600;\n            border: none;\n            border-radius: 0.5rem;\n            cursor: pointer;\n            transition: all 0.3s ease;\n        }\n\n        .reset-btn {\n            background-color: var(--btn-bg);\n            color: white;\n        }\n\n        .reset-btn:hover {\n            background-color: var(--btn-hover);\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(183, 75, 75, 0.3);\n        }\n\n        .back-btn {\n            background-color: #6b7280;\n            color: white;\n        }\n\n        .back-btn:hover {\n            background-color: #4b5563;\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(107, 114, 128, 0.3);\n        }\n\n        .loading {\n            display: none;\n            text-align: center;\n            padding: 2rem;\n        }\n\n        .loading.active {\n            display: block;\n        }\n\n        .spinner-small {\n            border: 4px solid rgba(255, 255, 255, 0.3);\n            border-top: 4px solid var(--btn-bg);\n            border-radius: 50%;\n            width: 40px;\n            height: 40px;\n            animation: spin 1s linear infinite;\n            margin: 0 auto 1rem;\n        }\n\n        .error-message {\n            color: #ef4444;\n            font-size: 1.4rem;\n            padding: 1rem;\n            background-color: rgba(239, 68, 68, 0.2);\n            border-radius: 0.5rem;\n            margin-top: 1rem;\n            display: none;\n        }\n\n        .error-message.show {\n            display: block;\n        }\n\n        @media (max-width: 768px) {\n            .quiz-header h1 {\n                font-size: 2rem;\n            }\n\n            .question-text {\n                font-size: 1.4rem;\n            }\n\n            .answer-btn {\n                font-size: 1.2rem;\n            }\n\n            .score-display {\n                font-size: 3rem;\n            }\n        }\n    " }} />

  <main className="quiz-container">
    <div className="quiz-header">
      <h1>Quiz Game</h1>
      <p style={{fontSize: '1.6rem', color: 'rgba(255, 255, 255, 0.7)'}}>Upload a PDF or Word file to generate a quiz</p>
    </div>
    {/* Upload Section */}
    <div className="upload-section" id="uploadSection">
      <h2>Upload Document</h2>
      <div className="file-input-wrapper">
        <input type="file" id="fileInput" accept=".pdf,.docx,.doc" />
        <label htmlFor="fileInput" className="file-input-label">📁 Choose PDF or Word File</label>
      </div>
      <div className="file-info" id="fileInfo" />
      <div className="question-count-input">
        <label htmlFor="questionCount">Number of Questions:</label>
        <input type="number" id="questionCount" min={1} max={20} defaultValue={5} />
      </div>
      <button className="generate-btn" id="generateBtn" disabled>Generate Quiz</button>
      <div className="error-message" id="errorMessage" />
      <div className="loading" id="loading">
        <div className="spinner-small" />
        <p>Processing file...</p>
      </div>
    </div>
    {/* Quiz Display Section */}
    <div className="quiz-display" id="quizDisplay">
      <div className="quiz-progress">
        <span id="progressText">Question 1 of 5</span>
        <div className="progress-bar">
          <div className="progress-fill" id="progressFill" />
        </div>
      </div>
      <div className="question-card" id="questionCard">
        <div className="question-text" id="questionText" />
        <div className="answer-options" id="answerOptions" />
        <button className="next-btn" id="nextBtn">Next Question</button>
      </div>
    </div>
    {/* Results Section */}
    <div className="results-section" id="resultsSection">
      <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Quiz Complete!</h2>
      <div className="score-display" id="scoreDisplay">0/0</div>
      <div className="score-percentage" id="scorePercentage">0%</div>
      <p id="scoreMessage" style={{fontSize: '1.8rem', color: 'var(--text-color)', marginBottom: '1rem'}} />
      <div className="button-group">
        <button className="reset-btn" id="resetBtn">Take Another Quiz</button>
        <button className="back-btn" onClick={() => navigate('/about')}>Back</button>
      </div>
    </div>
  </main>
  <footer className="footer">
    <p>© 2026 My Portfolio. All rights reserved.</p>
    <p>© Newly built website by truely youre's</p>
  </footer>
</div>

    );
}

export default QuizPage;