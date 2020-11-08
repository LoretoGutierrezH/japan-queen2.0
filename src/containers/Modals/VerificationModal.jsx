import React, { Fragment, useState } from 'react';
import style from './VerificationModal.module.css';

const VerificationModal = (props) => {
  
  return (
    <article className={props.modalState ? style.modalWrapper : style.hidden}>
      <section className={style.modalContent}>
        <h1 onClick={props.closeModal} className={style.closeBtn}>&times;</h1>
        <p>¿Está seguro de que quiere enviar el pedido a cocina para su preparación?'</p>
        <form onSubmit={(event) => props.sendOrders(event)}>
            <button type="submit" className={style.modalInnerButton}>Enviar</button>
        </form>

        <button type="text" onClick={props.closeModal} className={style.modalInnerButton}>Cancelar</button>
      </section>
      

    </article>
  );
}

export default VerificationModal;