import React, { Fragment, useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import style from './IncomingOrders.module.css';
import Header from '../../containers/Header/Header.jsx';
import IncomingOrder from '../IncomingOrders/IncomingOrder.jsx';
import firebase, {auth, db} from '../../firebase';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes';

const IncomingOrders = (props) => {
  const [ordersState, setOrdersState] = useState([]);
  const signOut = () => {
    auth.signOut();
    props.onSignOut(false);
    console.log('Sesión cerrada');
  }
 
  useEffect(() => {
    const unsuscribe = db.collection('Orders').where('state', '==', 'pending').orderBy('timestamp', 'desc').onSnapshot(docs => {
      const orders = [];
      docs.forEach(doc => {
         orders.push({id: doc.id, ...doc.data()});
         console.log(doc.data());
      })
      setOrdersState(orders)
    })
    return () => {
      unsuscribe();
    }
  }, [])
  
  const renderedIncomingOrders = ordersState.map(order => {
    return <IncomingOrder  key={order.id} id={order.id} table={order.table} products={order.products} />
  });

  return (
    <Fragment>
      {props.authenticated === false ? <Redirect to="/"/> : null}
      <Header />
      <main className={style.incomingOrders}>
        <button onClick={signOut}>Cerrar sesión</button>
        <section className={style.headingContainer}>
          <h5>Chef</h5>
          <h5>Pedidos entrantes</h5>
        </section>
        <section className={style.ordersContainer}>
          {renderedIncomingOrders}
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

export default connect(mapStateToProps, mapDispatchToProps)(IncomingOrders);