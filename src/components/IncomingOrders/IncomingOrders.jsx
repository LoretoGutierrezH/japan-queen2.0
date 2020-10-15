import React, { Fragment } from 'react';
import style from './IncomingOrders.module.css';
import Header from '../../containers/Header/Header.jsx';

const IncomingOrders = (props) => {
  return (
    <Fragment>
      <Header />
      <main>
       <h1>Lista de órdenes</h1>
      </main>
    </Fragment>
  );
}

export default IncomingOrders;