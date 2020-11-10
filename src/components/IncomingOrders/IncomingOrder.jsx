import React, {useState} from 'react';
import style from './IncomingOrders.module.css';
import Counter from '../Counter/Counter.jsx';
import firebase, {db} from '../../firebase';

const IncomingOrder = (props) => {
  const [counter, setCounter] = useState({timeToFinish: 0})
  const [time, setTime] = useState(0);
  const [interval, configInterval] = useState(null);
  const products = props.products.map(product => {
    return <li>{product.productName}</li>
  });

  const startCounter = () => {
    let time = 0;
    const intervalFunction = () => {
      time += 1;
      console.log(time);
      setCounter(prevCounter => {
        return {
          timeToFinish: prevCounter.timeToFinish,
          timeToFinish: time
        }
      })
      return time;
    }

    configInterval(setInterval(intervalFunction, 1000)); 
  }

  const updateOrder = () => {
    db.collection('Orders').doc(`${props.id}`).update({
      preparationTime: counter.timeToFinish
    })
  }

  const stopCounter = () => {
    clearInterval(interval);
    updateOrder();
  }

  



  return (
      <article className={style.orderCard}>
        <section className={style.orderDetails}>
          <h5>Mesa {props.table}</h5>
          <ul className={style.productsList}>
            {products}
          </ul>
        </section>

        <section className={style.actionsContainer}>
          <button onClick={startCounter} className="golden-btn">Preparando</button>
          <button onClick={stopCounter} className="golden-btn">Terminado</button>
        </section>

        <section className={style.counterContainer}>
          <div className={style.wavesBackgroundContainer}>
          <Counter time={counter.timeToFinish} />
            {/* <img src={waves} alt="Olitas características del diseño de marca de Japan Queen"/> */}
          </div>
        </section>
       
       
      </article>
  );
}

export default IncomingOrder;