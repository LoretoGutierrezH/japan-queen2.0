import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import IncomingOrders from './components/IncomingOrders/IncomingOrders.jsx';
import WelcomePage from './containers/WelcomePage/WelcomePage.jsx';
import Menu from './components/Menu/Menu.jsx';
import WaiterMainPage from './components/WaiterMainPage/WaiterMainPage.jsx';
import firebase, {db, auth} from './firebase';
import LoginModal from './components/LoginModal/LoginModal.jsx';
import {connect} from 'react-redux';
import * as actionTypes from './store/actionTypes';



const  App = (props) => {
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

  //Redirección basada en roles creados a partir del correo electrónico
  let path;
  if (props.authenticated && props.role === "waiter") {
    path = "/mesero";
  } else if (props.authenticated && props.role === "chef") {
    path = "/chef";
  }
  
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <WelcomePage openModal={openModal} />
            <LoginModal modalState={loginModal.modalState} closeModal={closeModal} />
            <Redirect to={path}></Redirect>
          </Route>
          <Route path="/chef" component={IncomingOrders} />
          <Route path="/mesero/menú/:id" component={Menu}/>
          <Route path="/mesero" component={WaiterMainPage} />
        </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    role: state.role
  }
}

/* const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch({type: actionTypes.AUTHENTICATE})
  }
} */

export default connect(mapStateToProps)(App);
