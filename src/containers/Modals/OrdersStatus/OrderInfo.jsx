import React from 'react';
import style from './OrderInfo.module.css'

const OrderInfo = (props) => {
  const products = props.products.map(product => {
    return <p><span>{product.productQty}</span> {product.productName}</p>
  });
  return (
    <tr className={style.readyOrder}>
      <td className={style.data}>{props.table}</td>
      <td>
          {products}
      </td>
      <td className={style.data}>{props.readySince}</td>
      <td className={style.data}>
        <button>Entregar</button>
      </td>
    </tr>
  );
}

export default OrderInfo;