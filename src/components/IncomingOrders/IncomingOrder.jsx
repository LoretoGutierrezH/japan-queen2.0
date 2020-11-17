import React, {useState} from 'react';
import style from './IncomingOrders.module.css';
import Counter from '../Counter/Counter.jsx';
import firebase, {auth, db} from '../../firebase';


const IncomingOrder = (props) => {
  const [counter, setCounter] = useState({timeToFinish: 0})
  const [time, setTime] = useState(0);
  const [interval, configInterval] = useState(null);
  const products = props.products.map(product => {
    return <li style={{margin: '2rem 0rem'}}>{product.productName} <br />Cant.: {product.productQty}</li>
  });

  const signOut = () => {
    auth.signOut();
    props.onSignOut(false);
    console.log('Sesión cerrada');
  }

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

  const updateOrder = (obj) => {
    db.collection('Orders').doc(`${props.id}`).update({
      preparationTime: `${obj.h}:${obj.m}:${obj.s}`,
      state: 'ready',
      readySince: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  const stopCounter = () => {
    clearInterval(interval);
    //updateOrder();
    updateOrder(setSecondsToTime(counter.timeToFinish));
  }

  const setSecondsToTime = (secs) => {
      const hours = Math.floor(secs / (60 * 60));
      const divisorForMinutes = secs % (60 * 60);
      const minutes = Math.floor(divisorForMinutes / 60);
      const divisorForSeconds = divisorForMinutes % 60;
      const seconds = Math.ceil(divisorForSeconds);
  
      const obj = {
        h: hours,
        m: minutes,
        s: seconds,
      };
      return obj;
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