import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Ranking } from '../ranking/Ranking';
import './Player.css';

export const Player = () => {
  const [nick, setNick] = useState('');
  const navigate = useNavigate();
  const players = JSON.parse(localStorage.getItem('players')) || [];

  const handleStartGame = () => {
    if (nick.trim() === '') {
      alert('Por favor, ingresa un nombre');
    } else {
      let existingPlayer = players.find(player => player.nick === nick);

      if (existingPlayer) {
        alert('Ya existe un jugador con ese nombre');
      } else {
        existingPlayer = { nick, points: 0 };
        players.push(existingPlayer);
      }

      localStorage.setItem('activePlayer', JSON.stringify(existingPlayer));
      localStorage.setItem('players', JSON.stringify(players));
      
      navigate('/questions');
    }
  };

  return (
    <div className="player-container">
      <Ranking />
      <h1>Bienvenido al juego</h1>
      <InputText
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        placeholder="Ingresa tu nombre"
        className="player-input"
      />
      <Button 
        label="Empezar" 
        onClick={handleStartGame} 
        className="player-button" 
      />
    </div>
  );
};

export default Player;
