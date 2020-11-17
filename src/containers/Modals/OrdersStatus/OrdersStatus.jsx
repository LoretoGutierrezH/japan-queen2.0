import React, {useState, useEffect} from 'react';
import OrderInfo from './OrderInfo.jsx';
import firebase, {db, auth} from '../../../firebase';
import style from './OrdersStatus.module.css';
import {formattingTime} from '../../../utils/formattingTime';

const OrdersStatus = (props) => {
  const [orders, setOrders] = useState([]);
  /* const [popUp, setPopUp] = useState(false); */

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
            props.setModalState({modalState: true});
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

  const closeModal = () => {
    props.setModalState({modalState: false});
  }

  const ordersList = orders.map(order => {
    return (
      <OrderInfo key={order.id} id={order.id} table={order.table} products={order.products} readySince={formattingTime(null, order.readySince)} />
    )
  })

  return (
    <article className={props.modalState ? style.modalWrapper : style.hidden}>
      <section className={style.modalContent}>
        <h1 onClick={closeModal} className={style.closeBtn}>&times;</h1>
        <table>
          <tr>
            <th className={style.thead}>Mesa</th>
            <th className={style.thead}>Productos</th>
            <th className={style.thead}>Listo desde</th>
            <th className={style.thead}>Acción</th>
          </tr>
          {ordersList}
        </table>
      </section>
    </article>
  );
}

export default OrdersStatus;