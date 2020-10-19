import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../containers/Header/Header.jsx';
import devil from '../../assets/diabolo.png';
import style from './WaiterMainPage.module.css';

const WaiterMainPage = (props) => {
  return (
    <Fragment>
      <Header />
      <main className={style.waiterMainPage}>
        <section className={style.devilAndControls}>
            <div className={style.devilContainer}>
              <img src={devil} alt=""/>
            </div>
          
          <div className={style.controlsContainer}>
            <button>Estado de los pedidos</button>
            <button>Cerrar sesión</button>
          </div>
        </section>
        <section className={style.menuOptionsContainer}>
          <article className={style.optionsBox}>
            <h1>Mesero</h1>
            <div className={style.btnContainer}>
              <Link to="/mesero/menú/desayuno"><button className={`${style.menuBtn} golden-btn`}>Menú desayuno</button></Link>
              <Link to="/mesero/menú/almuerzo-cena"><button className={`${style.menuBtn} golden-btn`}>Menú almuerzo y cena</button></Link>
            </div>
          </article>
        </section>
      </main>
    </Fragment>
    
  );
}

export default WaiterMainPage;