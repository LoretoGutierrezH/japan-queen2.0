import React from 'react';
import style from './IncomingOrders.module.css';
import waves from '../../assets/olitascard.png';
import Counter from '../Counter/Counter.jsx';

const IncomingOrder = (props) => {
  return (
      <article className={style.orderCard}>
        <section className={style.orderDetails}>
          <h5>Mesa</h5>
          <ul className={style.productsList}>
            <li>Producto</li>
            <li>Producto</li>
            <li>Producto</li>
          </ul>
        </section>

        <section className={style.actionsContainer}>
          <button className="golden-btn">Preparando</button>
          <button className="golden-btn">Terminado</button>
        </section>

        <section className={style.counterContainer}>
          <div className={style.wavesBackgroundContainer}>
          <Counter />
            {/* <img src={waves} alt="Olitas características del diseño de marca de Japan Queen"/> */}
          </div>
        </section>
       
       
      </article>
  );
}

export default IncomingOrder;