import React, {Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../containers/Header/Header.jsx';
import devil from '../../assets/diabolo.png';
import style from './WaiterMainPage.module.css';
import * as actionTypes from '../../store/actionTypes';
import {connect} from 'react-redux';
import firebase, {auth} from '../../firebase';

const WaiterMainPage = (props) => {
  const signOut = () => {
    auth.signOut();
    props.onSignOut(false);
    console.log('Sesión cerrada');
  }

  return (
    <Fragment>
      {props.authenticated === false ? <Redirect to="/"/> : null}
      <Header />
      <main className={style.waiterMainPage}>
        <section className={style.devilAndControls}>
            <div className={style.devilContainer}>
              <img src={devil} alt=""/>
            </div>
          
          <div className={style.controlsContainer}>
            <button>Estado de los pedidos</button>
            <button onClick={signOut}>Cerrar sesión</button>
          </div>
        </section>
        <section className={style.menuOptionsContainer}>
          <article className={style.optionsBox}>
            <h1>Mesero</h1>
            <div className={style.btnContainer}>
              <Link to="/mesero/menú/desayuno"><button className={`${style.menuBtn} golden-btn`}>Menú desayuno</button></Link>
              <Link to="/mesero/menú/almuerzo-cena"><button className={`${style.menuBtn} golden-btn`}>Menú almuerzo y cena</button></Link>
            </div>
          </article>
        </section>
      </main>
    </Fragment>
    
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: (authValue) => dispatch({type: actionTypes.AUTHENTICATE, value: authValue})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WaiterMainPage);