import React, {useState} from 'react';
import Order from './Order.jsx';
import firebase, {db, auth} from '../../firebase';
import VerificationModal from '../../containers/Modals/VerificationModal.jsx';
import AlertModal from '../../containers/Modals/AlertModal/AlertModal.jsx';

const Orders = (props) => {
  const [verificationModalState, setVerificationModalState] = useState({modalState: false});
  const [alertModalState, setAlertModalState] = useState({modalState: false});


  const openVerificationModal = () => {
    setVerificationModalState(prevState => {
      return {
        modalState: prevState.modalState,
        modalState: true
      }
    });
  }

  const closeVerificationModal = () => {
    setVerificationModalState(prevState => {
      return {
        modalState: prevState.modalState,
        modalState: false
      }
    });
  }

  const openAlertModal = () => {
    setAlertModalState(prevState => {
      return {
        modalState: prevState.modalState,
        modalState: true
      }
    });
  }

  const closeAlertModal = () => {
    setAlertModalState(prevState => {
      return {
        modalState: prevState.modalState,
        modalState: false
      }
    });
  }


  const verifyOrAlert = () => {
    if (props.orders.ordersList.length === 0) {
      openAlertModal();
    } else {
      openVerificationModal();
    }

  }

  const sendOrders = (event) => {
    event.preventDefault();
    db.collection('Orders').add({
      products: props.orders.ordersList,
      total: props.orders.total,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log('Pedido agregado a la base de datos');
    })
    .catch(error => {
      console.log(error);
    })
  }

  const currentOrders = props.orders.ordersList.map(order => {
    return (
      <Order key={order.orderId} id={order.productId} productName={order.productName} productPrice={order.productPrice} productQty={order.productQty} totalPrice={order.totalPrice}/>
    )
  })

  return (
     <section>
       <VerificationModal modalState={verificationModalState.modalState} closeModal={closeVerificationModal} sendOrders={sendOrders} />
       <AlertModal modalState={alertModalState.modalState} closeModal={closeAlertModal} />

      <h1>Órden</h1>
      <ul>
        {currentOrders}
        {props.orders.total ? `Total: ${props.orders.total}` : null}
        <br />
        <button onClick={verifyOrAlert}>Enviar a cocina</button>
      </ul>
    </section>
  );
}

export default Orders;