import React, {Fragment} from 'react';
import Header from '../../containers/Header/Header.jsx';
import IncomingOrders from '../IncomingOrders/IncomingOrders.jsx';

const WaiterMainPage = (props) => {
  return (
    <Fragment>
      <Header />
      <main>
        <IncomingOrders />
      </main>
    </Fragment>
    
  );
}

export default WaiterMainPage;