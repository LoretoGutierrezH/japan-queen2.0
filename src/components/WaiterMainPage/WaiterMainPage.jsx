import React, {Fragment} from 'react';
import Header from '../../containers/Header/Header.jsx';

const WaiterMainPage = (props) => {
  return (
    <Fragment>
      <Header />
      <main>
        <h1>Página principal del mesero, en la que puede seleccionar el menú y ver los pedidos listos</h1>
      </main>
    </Fragment>
    
  );
}

export default WaiterMainPage;