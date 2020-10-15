import React from 'react';
import style from './WelcomePage.module.css';
import logo from '../../assets/logo.png';
import waves from '../../assets/olitas.png';
import { Link } from 'react-router-dom';

const WelcomePage = (props) => {
  return (
    <main className={style.welcomeContainer}>
      <div className={style.logoContainer}>
        <img src={logo} alt="Logo de Japan Queen"/>
      </div>
      <Link to="/chef"><button className={style.authBtn}>Entrar</button></Link>
      <div className={style.wavesContainer}>
        <img src={waves} alt="Olas de colores, parte del diseño de marca de Japan Queen"/>
      </div>
    </main>
  );
}

export default WelcomePage;