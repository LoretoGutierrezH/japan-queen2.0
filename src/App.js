import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IncomingOrders from './components/IncomingOrders/IncomingOrders.jsx';
import WelcomePage from './containers/WelcomePage/WelcomePage.jsx';
import Menu from './components/Menu/Menu.jsx';
import WaiterMainPage from './components/WaiterMainPage/WaiterMainPage.jsx';
import firebase, {db, auth} from './firebase';
import LoginModal from './components/LoginModal/LoginModal.jsx';



const  App = () => {
  const [loginModal, setLoginModal] = useState({modalState: false});
  const openModal = () => {
    setLoginModal(prevState => {
      return {
        modalState: prevState.modalState,
        modalState: true
      }
    });
  }

  const closeModal = () => {
    setLoginModal(prevState => {
      return {
        modalState: prevState.modalState,
        modalState: false
      }
    });
  }

  
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <WelcomePage openModal={openModal} />
            <LoginModal modalState={loginModal.modalState} closeModal={closeModal} />
          </Route>
          <Route path="/chef" component={IncomingOrders} />
          <Route path="/mesero/menú/:id" component={Menu}/>
          <Route path="/mesero" component={WaiterMainPage} />
        </Switch>
    </Router>
  );
}

export default App;
