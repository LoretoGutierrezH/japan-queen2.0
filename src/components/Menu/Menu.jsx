import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../containers/Header/Header.jsx';
import menuJson from '../../assets/data/menu.json';
import Product from '../Product/Product.jsx';
import style from './Menu.module.css';
import Orders from '../Order/Orders.jsx';
import TableSelectionModal from '../../containers/Modals/TableSelectionModal/TableSelectionModal.jsx';
import firebase, {auth, db} from '../../firebase';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes';
import VerificationModal from '../../containers/Modals/VerificationModal.jsx';
import AlertModal from '../../containers/Modals/AlertModal/AlertModal.jsx';



const Menu = (props) => {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState({
    ordersList: [],
    total: '',
  });
  const [table, setTable] = useState(1);
  const [tableModal, setTableModal] = useState({modalState: false});
  const [verificationModalState, setVerificationModalState] = useState({modalState: false});
  const [alertModalState, setAlertModalState] = useState({modalState: false});
  const [changeTable, setChangeTable] = useState(false);

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
    if (orders.ordersList.length === 0) {
      openAlertModal();
    } else {
      openVerificationModal();
    }

  }

  const getTotal = (orders) => {
    const total = orders.reduce((sum, item) => {
        return sum + item.totalPrice;
    }, 0)

    return total;
  }

  const addTable = (event) => {
    const selectedTable = event.currentTarget.value;
    setTable(selectedTable);

  }

  const closeModal = () => {
    setTableModal(prevState => {
      return {
        modalState: prevState.modalState,
        modalState: false
      }
    })
  }

  const addOrder = (event) => {
    const productId = event.currentTarget.id * 1;
    const productName = event.currentTarget.children[0].dataset.name
    const productPrice = event.currentTarget.children[1].dataset.price * 1;
    const productQty = event.target.value * 1;
    const totalPrice = productPrice * productQty; 

   
    const newOrder = {
      productId,
      productName,
      productPrice,
      productQty,
      totalPrice
    }
      
    setOrders(prevOrders => {
      if (prevOrders.ordersList.some(ele => ele.productId === newOrder.productId) && newOrder.productQty === 0) {
        const filteredOrders = prevOrders.ordersList.filter(order => order.productId !== newOrder.productId);

        return {
          state: 'pending',
          ordersList: filteredOrders,
          total: getTotal(filteredOrders),
        }
      } else if (prevOrders.ordersList.some(ele => ele.productId === newOrder.productId) && newOrder.productQty > 0) {
        const maintainedOrders = prevOrders.ordersList.filter(order => order.productId !== newOrder.productId);

        return {
          state: 'pending',
          ordersList: [...maintainedOrders, newOrder],
          total: getTotal([...maintainedOrders, newOrder]),
        }
      } else {
        return {
          state: 'pending',
          ordersList: [...prevOrders.ordersList, newOrder],
          total: getTotal([...prevOrders.ordersList, newOrder]),
        }
      }
    })
  }

  useEffect(() => {
    if (props.match.params.id === 'desayuno') {
      setMenu(menuJson[0].breakfastMenu);
    } else if (props.match.params.id === 'almuerzo-cena') {
      const lunchDinnerData= menuJson[0].lunchDinnerMenu
      console.log(lunchDinnerData.mainCourse);
      setMenu([...lunchDinnerData.mainCourse, ...lunchDinnerData.drinks, ...lunchDinnerData.sideDish, ...lunchDinnerData.extras])
      /* setMenu(lunchDinnerData);
      for (const key in lunchDinnerData) {
        console.log(key, lunchDinnerData[key])

        
      } */
    }  
  }, []);

  const openTableSelectionModal = () => {
    setTableModal(prevState => {
      return {
        modalState: prevState.modalState,
        modalState: true
      }
    })
  }

  useEffect(() => {
    openTableSelectionModal();
  }, [])

  let productsList = null;
  productsList = menu.map(product => {
    return (
        <Product key={product.id} id={product.id} name={product.name} price={product.price} addOrder={addOrder}/>
    )
  })

  const sendOrders = (event) => {
    event.preventDefault();
    console.log('la mesa', table, orders)
    db.collection('Orders').add({
      state: orders.state,
      table: table,
      products: orders.ordersList,
      total: orders.total,
      pendingSince: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log('Pedido agregado a la base de datos');
      setChangeTable(true);
    })
    .catch(error => {
      console.log(error);
    })
  }


  const signOut = () => {
    auth.signOut();
    props.onSignOut(false);
    console.log('Sesión cerrada');
  }

  console.log(table);
  return (
    <Fragment>
        <VerificationModal modalState={verificationModalState.modalState} closeModal={closeVerificationModal} sendOrders={sendOrders} />
       <AlertModal modalState={alertModalState.modalState} closeModal={closeAlertModal} />
       <TableSelectionModal modalState={tableModal.modalState} addTable={addTable} table={table} changeTable={() => alert('Cambiando mesa')} closeModal={closeModal}/>
      <Header />
      <main className={style.menu}>
        <div className={style.logoutContainer}>
          <button style={{marginRight: '1rem'}} onClick={signOut}>Cerrar sesión</button>
          <button onClick={openTableSelectionModal}>Cambiar mesa</button>
        </div>


        <section className={style.menuAndOrderWrapper}>
          <section className={style.menuContainer}>
            <h1>Menú</h1>
            <table>
              <tbody>
              {productsList}
              </tbody>
            </table>
          </section>
          <Orders table={table} orders={orders} verifyOrAlert={verifyOrAlert} changeTable={changeTable} />
        </section>

      </main>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    role: state.role
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: (authValue) => dispatch({type: actionTypes.AUTHENTICATE, value: authValue})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);