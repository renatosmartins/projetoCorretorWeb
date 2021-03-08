/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';

import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, TileLayer} from 'react-leaflet';
import '../styles/global.css';
import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';
import whatsApp from '../images/whatsapp.svg';
import instagram from '../images/instagram.svg';
import professional from '../images/professional.png';
import privacy from '../images/privacy.png';
import email from '../images/email.svg';
import caixa from '../images/caixa.png';
import bb from '../images/bb.png';
import itau from '../images/itau.png';
import bradesco from '../images/bradesco.png';
import santander from '../images/santander.png';

import markerMapIcon from '../utils/mapIcon';
import api from '../services/api';


interface Properties {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function Landing() {

    const [properties, setProperties] = useState<Properties[]>([]);

    useEffect(() => {
      api.get('properties').then(response => {
        setProperties(response.data);
      })
    }, []);

    return (
      <div id="page-landing">
        <div className="contact">
          <a href="http://wa.me/5562982142861" className="whatsapp" target="_blank">
            <img src={whatsApp} alt="whatsapp" />
            <span>(62) 98214-2861</span>
          </a>

          <a href="https://www.instagram.com/brainbrokers/" className="instagram" target="_blank">
            <img src={instagram} alt="instagram" />
            <span>@brainbrokers</span>
          </a>

          <a className="email">
            <img src={email} alt="email" />
            <span>contato@brainbrokers.com.br</span>
          </a>
        </div>

        <div className="content-wrapper">
          <img src={logoImg} alt="brokers"/>

          <main>
            <h1> Nosso compromisso é realizar seu sonho! </h1>
            <p> O seu novo imóvel está aqui.  </p>
          </main>

          <div className="location">
            <strong> Goiânia </strong>
            <span> Goiás </span>
          </div>
          

          <Link to="app" className="enter-app">
            <FiArrowRight 
              size={40}
              color="#ffffff"
            /> 
            Imóveis 
          </Link>
        </div>

        <div className="footer">
              <div className="professional">
                <img src={professional} alt="professional" />
                <strong>Profissionalismo</strong>
                <p> Conhecer a necessidade de cada cliente e as soluções que o mercado oferece. 
                  Otimizar o tempo de procura do imóvel de sua preferencia.
                  </p>
              </div>

              <div className="privacy">
                <img src={privacy} alt="privacy" />
                <strong>Privacidade</strong>
                <p> Conduta correta, justa e transparente fazem parte de nossas atitudes </p>    
              </div>
        </div>

        <div className="simulators">
          <h1>
            Simulador de Crédito Imobiliário
          </h1>
            <div className="images">
              <a target="_bank" rel="noopener noreferrer" href={`http://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso`}>
                <img src={caixa} alt="Caixa" />
              </a>
              <a target="_bank" rel="noopener noreferrer" href={`https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx?eni_gclid=Cj0KCQiA6t6ABhDMARIsAONIYyylBXBAetkVIYVzcgT42CWzj9dj_3wJewGZAh79uenlQLk1waquT4AaAiiUEALw_wcB&pk_vid=0489288766fa0b6d161218253418cd74`}>
                <img src={bb} alt="bb" />
              </a>
              <a target="_bank" rel="noopener noreferrer" href={`https://www.itau.com.br/emprestimos-financiamentos/credito-imobiliario/simulador/`}>
                <img src={itau} alt="itau" />
              </a>
              <a target="_bank" rel="noopener noreferrer" href={`https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/imoveis/credito-imobiliario-aquisicao-de-imoveis.shtm`}>
                <img src={bradesco} alt="bradesco"/>
              </a>
              <a target="_bank" rel="noopener noreferrer" href={`https://www.santander.com.br/creditos-e-financiamentos/para-sua-casa/credito-imobiliario?ic=homepf-cardsprod-creditoimobiliario`}>
                <img src={santander} alt="santander"/>
              </a>
            </div>
        </div>

        <div className="maps">
          <MapContainer 
              center={[-16.6806871,-49.2565673]}
              zoom={12.5}
              style={{width: '100%', height: '100%'}}
              scrollWheelZoom={false}
              doubleClickZoom={false}
          >
              <TileLayer className="tileLayer"
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/*<TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />*/}

                { properties.map(properties => {
                return (
                  <Marker 
                    icon={markerMapIcon}
                    position={[properties.latitude,properties.longitude]} 
                    key={properties.id}
                  >
                </Marker>
                );
                })
              }
          </MapContainer>
        </div>
          
        <div className="rights">
          <span>TODOS OS DIREITOS RESERVADOS.</span>
        </div>
    </div>
    );
}

export default Landing;