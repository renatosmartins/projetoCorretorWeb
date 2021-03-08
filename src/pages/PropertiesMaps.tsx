/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import { FiPlus, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup }  from 'react-leaflet';

import 'leaflet/dist/leaflet.css'

import asideIMG from '../images/asideLogo.svg';

import '../styles/pages/propertiesMaps.css';

import markerMapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Properties {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function PropertiesMaps() {
    const [properties, setProperties] = useState<Properties[]>([]);

    useEffect(() => {
      api.get('properties').then(response => {
        setProperties(response.data);
      })
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={asideIMG} alt="Properties" />
                    <h2>Clique e descubra as melhores opções de acordo com seu perfil no mapa.</h2> 
                </header>
              <footer>
                    <strong>Goiânia</strong>
                    <span>Goiás</span>
              </footer>
                <Link to="/">
                    <FiArrowLeft 
                      className="goBack"
                      color="#fffffff"
                      size={20}
                    />
                </Link>
            </aside>
            
            <MapContainer 
                center={[-16.6806871,-49.2565673]}
                zoom={13.5}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
               
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
                      <Popup 
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                        className="map-popup"
                      >
                      {properties.name}
                        <Link to={`/immobile/${properties.id}`}>
                          <FiArrowRight size={20} color="#FFF" />
                        </Link>
                      </Popup>
                  </Marker>
                  );
                  })
                }

            </MapContainer>

            <Link to="/immobile/create" className="create-properties">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default PropertiesMaps;