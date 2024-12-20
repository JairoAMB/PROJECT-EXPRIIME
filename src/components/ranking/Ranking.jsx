import React, { useState, useEffect } from 'react';
import './Ranking.css';

export const Ranking = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
  }, []);

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">Ranking de Jugadores</h1>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Nick</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {players.length === 0 ? (
            <tr>
              <td colSpan="2">No hay jugadores registrados</td>
            </tr>
          ) : (
            players.map((player, index) => (
              <tr key={index}>
                <td>{player.nick}</td>
                <td>{player.points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
