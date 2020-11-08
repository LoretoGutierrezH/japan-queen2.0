import React from 'react';
import style from './AlertModal.module.css';

const AlertModal = (props) => {
  return (
    <article className={props.modalState ? style.modalWrapper : style.hidden}>
      <section className={style.modalContent}>
        <h1 onClick={props.closeModal} className={style.closeBtn}>&times;</h1>
        <p>Pedido vacío. Ingrese un producto a la lista para enviar el pedido a cocina.</p>
      </section>
    </article>
  );
}

export default AlertModal;