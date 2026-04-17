import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TicTacToePage() {
  useEffect(() => {
    document.title = 'Tic Tac Toe';
  }, []);

  const navigate = useNavigate();
    return(
<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tic Tac Toe</title>
  <link rel="stylesheet" href="style.css" />
  <style dangerouslySetInnerHTML={{__html: "\n        .tictactoe-container {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            min-height: calc(100vh - 200px);\n            padding: 2rem;\n        }\n\n        .game-info {\n            text-align: center;\n            margin-bottom: 2rem;\n        }\n\n        .game-info h1 {\n            font-size: 3rem;\n            margin-bottom: 1rem;\n            color: var(--text-color);\n        }\n\n        .game-status {\n            font-size: 1.8rem;\n            margin-bottom: 1rem;\n            color: var(--btn-bg);\n            font-weight: 600;\n            min-height: 2.5rem;\n        }\n\n        .game-board {\n            display: grid;\n            grid-template-columns: repeat(3, 120px);\n            gap: 0;\n            background-color: var(--btn-bg);\n            padding: 5px;\n            border-radius: 0.5rem;\n            margin-bottom: 2rem;\n            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n        }\n\n        .game-cell {\n            width: 120px;\n            height: 120px;\n            background-color: var(--bg-color);\n            border: none;\n            font-size: 3rem;\n            font-weight: 700;\n            cursor: pointer;\n            color: var(--text-color);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            transition: all 0.3s ease;\n        }\n\n        .game-cell:hover {\n            background-color: rgba(183, 75, 75, 0.2);\n            transform: scale(0.95);\n        }\n\n        .game-cell:active {\n            transform: scale(0.9);\n        }\n\n        .game-cell.x {\n            color: #3b82f6;\n        }\n\n        .game-cell.o {\n            color: #ef4444;\n        }\n\n        .button-group {\n            display: flex;\n            gap: 1rem;\n            justify-content: center;\n            flex-wrap: wrap;\n        }\n\n        .reset-btn, .back-btn {\n            padding: 1rem 2rem;\n            font-size: 1.6rem;\n            font-weight: 600;\n            border: none;\n            border-radius: 0.5rem;\n            cursor: pointer;\n            transition: all 0.3s ease;\n        }\n\n        .reset-btn {\n            background-color: var(--btn-bg);\n            color: white;\n        }\n\n        .reset-btn:hover {\n            background-color: var(--btn-hover);\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(183, 75, 75, 0.3);\n        }\n\n        .back-btn {\n            background-color: #6b7280;\n            color: white;\n        }\n\n        .back-btn:hover {\n            background-color: #4b5563;\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(107, 114, 128, 0.3);\n        }\n\n        @media (max-width: 480px) {\n            .game-board {\n                grid-template-columns: repeat(3, 80px);\n                gap: 3px;\n                padding: 3px;\n            }\n\n            .game-cell {\n                width: 80px;\n                height: 80px;\n                font-size: 2rem;\n            }\n\n            .game-info h1 {\n                font-size: 2rem;\n            }\n\n            .game-status {\n                font-size: 1.4rem;\n            }\n        }\n    " }} />

  <main className="tictactoe-container">
    <div className="game-info">
      <h1>Tic Tac Toe</h1>
      <div className="game-status" id="gameStatus">Player X's Turn</div>
    </div>
    <div className="game-board" id="gameBoard">
      <button className="game-cell" data-index={0} />
      <button className="game-cell" data-index={1} />
      <button className="game-cell" data-index={2} />
      <button className="game-cell" data-index={3} />
      <button className="game-cell" data-index={4} />
      <button className="game-cell" data-index={5} />
      <button className="game-cell" data-index={6} />
      <button className="game-cell" data-index={7} />
      <button className="game-cell" data-index={8} />
    </div>
    <div className="button-group">
      <button className="reset-btn" id="resetBtn">Reset Game</button>
      <button className="back-btn" onClick={() => navigate('/about')}>Back</button>
    </div>
  </main>
  <footer className="footer">
    <p>© 2026 My Portfolio. All rights reserved.</p>
    <p>© Newly built website by truely youre's</p>
  </footer>
</div>

    );
}

export default TicTacToePage;