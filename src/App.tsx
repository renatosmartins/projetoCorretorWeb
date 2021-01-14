/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import './styles/global.css';
import './styles/pages/landing.css';

import logoImg from './images/logo.svg';
import whatsApp from './images/whatsapp.svg';

function App() {
  return (
    <div id="page-landing">
      
      <div className="contact">
        <img src={whatsApp} alt="whatsapp" />
        <span>(62) 98214-2861</span>
      </div>

      <div className="content-wrapper">
    
      <img src={logoImg} alt="brokers"/>

        <main>
          <h1> Vendemos seu imovel </h1>
          <p> Utilizamos da tecnologia para facilitar a venda de seus imóveis </p>
        </main>

        <div className="location">
          <strong> Goiânia </strong>
          <span> Goiás </span>
        </div>
        

        <a href="" className="enter-app">
          <FiArrowRight 
            size={26}
            color="rgba(0,0,0,0.6)"
          /> 
        </a>
      </div>
    </div> 

  );
}

export default App;
