import React, {useState} from 'react';
import Order from './Order.jsx';
import firebase, {db, auth} from '../../firebase';
import { Redirect } from 'react-router-dom';
import style from './Orders.module.css';

const Orders = (props) => {

  const currentOrders = props.orders.ordersList.map(order => {
    return (
      <Order key={order.orderId} id={order.productId} productName={order.productName} productPrice={order.productPrice} productQty={order.productQty} totalPrice={order.totalPrice}/>
    )
  })

  return (
     <section className={style.orderSummaryContainer}>
       {props.changeTable ? <Redirect to="/mesero"/> : null}
       

      <h1>Órden</h1>
      <ul>
        {currentOrders}
        {props.orders.total ? <h4>Total: ${props.orders.total}</h4> : null}
        <br />
        <button onClick={props.verifyOrAlert}>Enviar a cocina</button>
      </ul>
    </section>
  );
}

export default Orders;