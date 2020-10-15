import React, { Fragment } from 'react';
import Header from '../../containers/Header/Header.jsx';

const Menu = (props) => {
  return (
    <Fragment>
      <Header />
      <main>
        <h1>Menú con lista de productos</h1>
      </main>
    </Fragment>
  );
}

export default Menu;