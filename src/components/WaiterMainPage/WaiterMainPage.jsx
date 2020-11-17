import React, {Fragment, useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../containers/Header/Header.jsx';
import OrderStatus from '../../containers/Modals/OrdersStatus/OrdersStatus.jsx';
import devil from '../../assets/diabolo.png';
import style from './WaiterMainPage.module.css';
import * as actionTypes from '../../store/actionTypes';
import {connect} from 'react-redux';
import firebase, {auth, db} from '../../firebase';

const WaiterMainPage = (props) => {
  const [modalState, setModalState] = useState({modalState: false});
  const [orders, setOrders] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const signOut = () => {
    auth.signOut();
    props.onSignOut(false);
    console.log('Sesión cerrada');
  }
  
  const openModal = () => {
    setModalState({modalState: true});
  }

  const closeModal = () => {
    setModalState({modalState: false});
    setPopUp(false);
  }

  useEffect(() => {
    const unsuscribe = db.collection('Orders').where('state', '==', 'ready').orderBy('readySince').onSnapshot(docs => {
      const orders = [];
      docs.forEach(doc => {
         orders.push({id: doc.id, ...doc.data()});
      })
      //El modal solo se activa cuando hay una actualización en tiempo real de un pedido, no cuando el mesero inicia sesión (la idea es que solo reciba notificaciones de los pedidos que él/ella ingreso durante su turno y solo si el estado de esos pedidos cambia desde la cocina)
      setOrders(prevOrders => {
        if (prevOrders.length !== 0) {
          if (`${prevOrders}` !== `${orders}`) {
            setPopUp(true);
            console.log('POPUP ACTIVATED');
            return orders;
          }
        } else {
          console.log('POPUP NOT ACTIVATED');
          return orders;
        }
        
      })
    })
    return () => {
      unsuscribe();
    }
  }, [])

  return (
    <Fragment>
      {props.authenticated === false ? <Redirect to="/"/> : null}
      <OrderStatus modalState={modalState.modalState} setModalState={setModalState} orders={orders} closeModal={closeModal} />
      <Header />
      <main className={style.waiterMainPage}>
        <section className={style.devilAndControls}>
            <div className={style.devilContainer}>
              <img src={devil} alt=""/>
            </div>
          
          <div className={style.controlsContainer}>
            <button className={popUp ? style.alertBtn : null} onClick={openModal}>Estado de los pedidos</button>
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