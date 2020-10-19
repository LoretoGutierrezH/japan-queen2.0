import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IncomingOrders from './components/IncomingOrders/IncomingOrders.jsx';
import WelcomePage from './containers/WelcomePage/WelcomePage.jsx';
import Menu from './components/Menu/Menu.jsx';
import WaiterMainPage from './components/WaiterMainPage/WaiterMainPage.jsx';

const  App = () => {
  return (
    <Router>
        <Switch>
          <Route path="/" component={WelcomePage} exact />
          <Route path="/chef" component={IncomingOrders} />
          <Route path="/mesero/menú/:id" component={Menu}/>
          <Route path="/mesero" component={WaiterMainPage} />
        </Switch>
    </Router>
  );
}

export default App;
