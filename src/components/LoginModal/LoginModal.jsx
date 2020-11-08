import React, {useState} from 'react';
import style from './LoginModal.module.css';
import firebase, {auth} from '../../firebase';
import * as actionTypes from '../../store/actionTypes';
import {connect} from 'react-redux';

const LoginModal = (props) => {
  const login = (event) => {
    event.preventDefault();
    console.log('Iniciando sesión');
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    auth.signInWithEmailAndPassword(`${email}`, `${password}`)
    .then(done => console.log('Sesión iniciada'))
    .catch(error => console.log(error));
  }

  auth.onAuthStateChanged(user => {
    if (user !== null) {
      let role;
      if (user.email.includes('waiter')) {
        role = 'waiter';
      } else {
        role = 'chef';
      }
      props.onAuthenticate(true, role);
    } else {
      props.onAuthenticate(false);
    }
  })

  return (
    <article className={props.modalState ? style.modalWrapper : style.hidden}>
      <form onSubmit={(event) => login(event)} className={style.modalContent}>
          <h1 onClick={props.closeModal} className={style.closeBtn}>&times;</h1>
          <input name="email" className={style.modalInputs} type="email" required placeholder="Correo" />
          <input name="password" className={style.modalInputs} type="password" required placeholder="Contraseña" />
          <button type="submit" className={style.modalInnerButton}>Entrar</button>
      </form>
    </article>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (authValue, role) => dispatch({type: actionTypes.AUTHENTICATE, value: authValue, role: role})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);