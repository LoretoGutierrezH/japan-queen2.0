import React from 'react';
import style from './TableSelectionModal.module.css';


const TableSelectionModal = (props) => {
  return (
    <article className={props.modalState ? style.modalWrapper : style.hidden}>
      <section className={style.modalContent}>
        <h5>Selecciona una mesa para tomar el pedido.</h5>
          <select onChange={props.addTable} name="table" defaultValue="0">
            <option value="1">Mesa 1</option>
            <option value="2">Mesa 2</option>
            <option value="3">Mesa 3</option>
            <option value="4">Mesa 4</option>
            <option value="5">Mesa 5</option>
            <option value="6">Mesa 6</option>
            <option value="7">Mesa 7</option>
            <option value="8">Mesa 9</option>
            <option value="10">Mesa 10</option>
          </select>
          {props.table !== null ? <p>Seleccionaste la mesa {props.table}.<br />Haz click en el botón para confirmar tu selección.</p> : null}
          <button onClick={props.closeModal}>Confirmar</button>
      </section>
    </article>
  );
}

export default TableSelectionModal;