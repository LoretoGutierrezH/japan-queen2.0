import React, {useState, useEffect} from 'react';
import OrderInfo from './OrderInfo.jsx';
import firebase, {db, auth} from '../../../firebase';
import style from './OrdersStatus.module.css';
import {formattingTime} from '../../../utils/formattingTime';

const OrdersStatus = (props) => {
  /* const [popUp, setPopUp] = useState(false); */

  const ordersList = props.orders.map(order => {
    return (
      <OrderInfo key={order.id} id={order.id} table={order.table} products={order.products} readySince={formattingTime(null, order.readySince)} deliverOrder={props.deliverOrder} />
    )
  })

  let table;

  if (ordersList.length === 0) {
    table = <p>Aún no hay pedidos listos para su entrega.</p>;
  } else {
    table = <table>
    <tbody>
      <tr>
        <th className={style.thead}>Mesa</th>
        <th className={style.thead}>Productos</th>
        <th className={style.thead}>Listo desde</th>
        <th className={style.thead}>Acción</th>
      </tr>
      {ordersList}
    </tbody>
  </table>;
  }

  return (
    <article className={props.modalState ? style.modalWrapper : style.hidden}>
      <section className={style.modalContent}>
        <h1 onClick={props.closeModal} className={style.closeBtn}>&times;</h1>
        {table}
      </section>
    </article>
  );
}

export default OrdersStatus;