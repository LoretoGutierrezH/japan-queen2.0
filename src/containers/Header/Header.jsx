import React from 'react';
import waves from '../../assets/olitas.png';
import style from './Header.module.css';

const Header = (props) => {
  return (
    <header className={style.header}>
      <div className={style.wavesContainer}>
        <img src={waves} alt=""/>
      </div>
    </header>
  );
}

export default Header;