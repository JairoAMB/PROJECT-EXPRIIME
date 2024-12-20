import React from 'react';
import { Avatar } from 'primereact/avatar';
import './Header.css';

const Header = ({ score }) => {
  const activePlayer = JSON.parse(localStorage.getItem("activePlayer"));
  const name = activePlayer ? activePlayer.nick : 'Invitado';

  return (
    <div className="header-container">
      <div className="avatar-container">
        <Avatar icon="pi pi-user" className="header-avatar" />
      </div>
      <div className="header-text">
        <h1 className="username">Hola, {name}</h1>
        <p className="score-text">Puntaje: {score}</p>
      </div>
    </div>
  );
};

export default Header;

