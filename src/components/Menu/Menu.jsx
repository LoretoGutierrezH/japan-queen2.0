import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../containers/Header/Header.jsx';
import menuJson from '../../assets/data/menu.json';
import Product from '../Product/Product.jsx';
import style from './Menu.module.css';
import Orders from '../Order/Orders.jsx';

const Menu = (props) => {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState({
    ordersList: [],
    total: '',
  });

  const getTotal = (orders) => {
    const total = orders.reduce((sum, item) => {
        return sum + item.totalPrice;
    }, 0)

    return total;
  }

  const addOrder = (event) => {
    const productId = event.currentTarget.id * 1;
    const productName = event.currentTarget.children[0].dataset.name
    const productPrice = event.currentTarget.children[1].dataset.price * 1;
    const productQty = event.target.value * 1;
    const totalPrice = productPrice * productQty; 

   
    const newOrder = {
      orderId: Math.floor(Math.random * 3000),
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
          ordersList: filteredOrders,
          total: getTotal(filteredOrders),
        }
      } else if (prevOrders.ordersList.some(ele => ele.productId === newOrder.productId) && newOrder.productQty > 0) {
        const maintainedOrders = prevOrders.ordersList.filter(order => order.productId !== newOrder.productId);

        return {
          ordersList: [...maintainedOrders, newOrder],
          total: getTotal([...maintainedOrders, newOrder]),
        }
      } else {
        return {
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

      for (const key in lunchDinnerData) {
        console.log(key, lunchDinnerData[key])
      }
    }  
  }, []);

  let productsList = null;
  productsList = menu.map(product => {
    return (
        <Product key={product.id} id={product.id} name={product.name} price={product.price} addOrder={addOrder}/>
    )
  })


  return (
    <Fragment>
      <Header />
      <main className={style.menu}>
        <section>
          <h1>Menú con lista de productos</h1>
          <table>
            <tbody>
            {productsList}
            </tbody>
          </table>
        </section>
        <Orders orders={orders} />
      </main>
    </Fragment>
  );
}

export default Menu;