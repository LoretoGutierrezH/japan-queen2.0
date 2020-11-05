import React from 'react';
import Order from './Order.jsx';

const Orders = (props) => {
  const sendOrders = () => {
    alert('Orden enviada a cocina');
  }

  const currentOrders = props.orders.ordersList.map(order => {
    return (
      <Order key={order.orderId} id={order.productId} productName={order.productName} productPrice={order.productPrice} productQty={order.productQty} totalPrice={order.totalPrice}/>
    )
  })

  return (
     <section>
      <h1>Órden</h1>
      <ul>
        {currentOrders}
        {props.orders.total ? `Total: ${props.orders.total}` : null}
        <br />
        <button onClick={sendOrders}>Enviar a cocina</button>
      </ul>
    </section>
  );
}

export default Orders;