import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import './Questions.css';

const Questions = () => {
  const players = JSON.parse(localStorage.getItem('players')) || [];
  const navigate = useNavigate();

  const activePlayer = JSON.parse(localStorage.getItem('activePlayer')) || null;
  const userName = activePlayer ? activePlayer.nick : null;

  const userExist = () => {
    if (!userName) {
      navigate('/');
    }
  };

  useEffect(() => {
    userExist();
  }, [userName]);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=15&type=multiple");
        const data = await response.json();
        if (data.results) {
          setQuestions(data.results);
        }
      } catch (error) {
        console.error("Error al cargar las preguntas", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (gameOver) return;

    if (answer === questions[currentQuestion]?.correct_answer) {
      const newScore = score + 1;
      setScore(newScore);

      if (!userName) {
        alert("El nombre de usuario no está definido correctamente.");
        return;
      }

      let updatedPlayers = [...players];
      let currentPlayer = updatedPlayers.find(player => player.nick === userName);

      if (currentPlayer) {
        if (newScore > currentPlayer.points) {
          currentPlayer.points = newScore;
        }
      } else {
        currentPlayer = { nick: userName, points: newScore };
        updatedPlayers.push(currentPlayer);
      }

      localStorage.setItem('players', JSON.stringify(updatedPlayers));

      const existingScore = JSON.parse(localStorage.getItem(`userScore_${userName}`)) || 0;
      if (newScore > existingScore) {
        localStorage.setItem(`userScore_${userName}`, newScore);
      }
    } else {
      setGameOver(true);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setCurrentQuestion(0);

    // Mezclar las preguntas de manera aleatoria cuando se reinicie el juego
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  };

  const handleChangeUser = () => {
    navigate('/');
  };

  if (!questions.length) {
    return <div className="loading-text">Cargando preguntas...</div>;
  }

  return (
    <div className="game-container">
      <Header score={score} />

      <div className="game-content">
        {gameOver ? (
          <div className="game-over">
            <h2>Game Over</h2>
            <p>Tu puntuación final es: {score}</p>
            <button onClick={handleRestart}>Volver a Intentar</button>
            <button onClick={handleChangeUser}>Cambiar Usuario</button>
          </div>
        ) : (
          <div className="question-container">
            <h1>Pregunta {currentQuestion + 1}</h1>
            <p>{questions[currentQuestion]?.question}</p>
            <div className="answers-container">
              {questions[currentQuestion]?.incorrect_answers.concat(questions[currentQuestion]?.correct_answer)
                .sort(() => Math.random() - 0.5)
                .map((answer, index) => (
                  <button key={index} onClick={() => handleAnswer(answer)} className="answer-button">
                    {answer}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
