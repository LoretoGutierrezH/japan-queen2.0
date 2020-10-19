import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../containers/Header/Header.jsx';
import menuJson from '../../assets/data/menu.json';
import Product from '../Product/Product.jsx';
import style from './Menu.module.css';

const Menu = (props) => {
  const [menu, setMenu] = useState([]);

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
        <Product key={product.id} name={product.name} price={product.price}/>
    )
  })


  
  return (
    <Fragment>
      <Header />
      <main className={style.menu}>
        <h1>Menú con lista de productos</h1>
        <table>
          <tbody>
          {productsList}
          </tbody>
        </table>
      </main>
    </Fragment>
  );
}

export default Menu;