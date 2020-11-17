import React from 'react';

const Order = (props) => {
  return (
   <li style={{margin: '2rem'}}>{props.productName} <span>Cant.: {props.productQty}</span> <span>Precio: ${props.totalPrice}</span></li>
  );
}

export default Order;