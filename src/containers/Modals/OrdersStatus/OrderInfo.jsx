import React from 'react';
import style from './OrderInfo.module.css'

const OrderInfo = (props) => {
  const products = props.products.map(product => {
    return <p key={product.id}><span>{product.productQty}</span> {product.productName}</p>
  });
  return (
    <tr className={style.readyOrder}>
      <td className={style.data}>{props.table}</td>
      <td>
          {products}
      </td>
      <td className={style.data}>{props.readySince}</td>
      <td className={style.data}>
        <button id={props.id} onClick={props.deliverOrder}>Entregar</button>
      </td>
    </tr>
  );
}

export default OrderInfo;