import React from 'react';

const Order = (props) => {
  return (
   <li>{props.productName} <span>Cant.: {props.productQty}</span> <span>Precio: ${props.totalPrice}</span></li>
  );
}

export default Order;