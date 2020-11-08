import React, {useState} from 'react';
import style from './LoginModal.module.css';

const LoginModal = (props) => {
  const login = (event) => {
    event.preventDefault();
    console.log('Iniciando sesión');
  }

  return (
    <article className={props.modalState ? style.modalWrapper : style.hidden}>
      <form onSubmit={(event) => login(event)} className={style.modalContent}>
          <h1 onClick={props.closeModal} className={style.closeBtn}>&times;</h1>
          <input className={style.modalInputs} type="email" required placeholder="Correo" />
          <input className={style.modalInputs} type="password" required placeholder="Contraseña" />
          <button type="submit" className={style.modalInnerButton}>Entrar</button>
      </form>
    </article>
  );
}

export default LoginModal;