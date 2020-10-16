import React, { Fragment } from 'react';
import style from './IncomingOrders.module.css';
import Header from '../../containers/Header/Header.jsx';
import IncomingOrder from '../IncomingOrders/IncomingOrder.jsx';

const IncomingOrders = (props) => {
  return (
    <Fragment>
      <Header />
      <main className={style.incomingOrders}>
        <section className={style.headingContainer}>
          <h5>Chef</h5>
          <h5>Pedidos entrantes</h5>
        </section>
        <section className={style.ordersContainer}>
          <IncomingOrder />
          <IncomingOrder />
          <IncomingOrder />
          <IncomingOrder />
          <IncomingOrder />
          <IncomingOrder />
          <IncomingOrder />
          <IncomingOrder />


        </section>
      </main>
    </Fragment>
  );
}

export default IncomingOrders;