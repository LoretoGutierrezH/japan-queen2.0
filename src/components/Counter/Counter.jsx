import React from 'react';
import style from './Counter.module.css';

const Counter = (props) => {
  return (
    <article className={style.counterContainer}>
      <h1>{props.time}</h1>
    </article>
  );
}

export default Counter;