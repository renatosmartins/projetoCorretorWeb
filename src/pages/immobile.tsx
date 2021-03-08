import React, { useEffect, useState } from 'react';
import { FaWhatsappSquare } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import '../styles/pages/immobile.css';
import Sidebar from '../components/Sidebar';

import markerMapIcon from '../utils/mapIcon';
import api from '../services/api';
import {  useParams } from 'react-router-dom';

interface ImmobileDetails {
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    image: {
        url: string;
        id: number;
    }[];
}

interface immobileParams {
    id: string;
}

export default function Immobile() {
    const params = useParams<immobileParams>();
    const [immobile, setImmobile] = useState<ImmobileDetails>();
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        api.get(`properties/${params.id}`).then(response => {
            setImmobile(response.data);
        })
    }, [params.id]);

    if(!immobile) {
        return <p>Carregando...</p>
    }

    return (
        <div id="page-immobile">
            <Sidebar />
            <main>
                <div className="immobile-details">
                <img src={immobile.image[activeImageIndex].url} alt={immobile.name} />

                  <div className="imagesImmobile">
                      {
                        immobile.image.map((images, index) => {
                            return (
                                <button 
                                    key={images.id} 
                                    className={activeImageIndex === index ? 'active' : ''} 
                                    type="button"
                                    onClick={() => {
                                        setActiveImageIndex(index)
                                    }}
                                >
                                    <img src={images.url} alt={immobile.name} />

                                </button>
                            );
                        })
                      }
                  </div>

                  <div className="immobile-details-content">
                      <h1>{immobile.name}</h1>
                      <p>{immobile.about}</p>
                      <div className="map-container">
                          <MapContainer
                              center={[immobile.latitude, immobile.longitude]}
                              zoom={16}
                              style={{width: '100%', height: 280}}
                              dragging={false}
                              touchZoom={false}
                              zoomControl={false}
                              scrollWheelZoom={false}
                              doubleClickZoom={false}
                          >
                              <TileLayer 
                                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}                                
                              />
                          
                              <Marker interactive={false} icon={markerMapIcon} position={[immobile.latitude, immobile.longitude]} />

                          </MapContainer>

                          <footer>
                              <a target="_bank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${immobile.latitude}, ${immobile.longitude}`}>Ver rotas no Google Maps</a>
                          </footer>
                      </div>
                      
                      <hr />

                      <h2>Agendamentos</h2>
                      <p>{immobile.instructions}</p>

                      <div className="open-details">
                          <div className="hour">
                              <FiClock size={32} color="#ff9a04" />
                              Segunda à sexta <br />
                              {immobile.opening_hours}
                          </div>
                          { immobile.open_on_weekends ? (
                              <div className="open-on-weekends">
                                  <FiInfo size={32} color ="#39cc83" />
                                  Atendemos <br />
                                  no final de semana
                                  {immobile.open_on_weekends}
                              </div>
                          ) : (
                              <div className="open-on-weekends dont-open">
                                  <FiInfo size={32} color ="#ff669d" />
                                  Não atendemos <br />
                                  no final de semana
                          </div>
                          )}
                      </div>

                      <button type="button" className="contact-button">
                        <a href="http://wa.me/5562982142861" className="whatsapp" target="_blank" rel="noreferrer noopener">
                            <FaWhatsappSquare size={50} color="#FFF" href="http://wa.me/5562982142861" />
                                Entrar em contato
                        </a>
                      </button>
                  </div>                    
                </div>
            </main>
        </div>
    );
}

