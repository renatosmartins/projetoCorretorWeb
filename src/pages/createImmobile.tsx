/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useHistory } from 'react-router-dom';

import '../styles/pages/create-immobile.css';
import Sidebar from '../components/Sidebar';

import markerMapIcon from '../utils/mapIcon';
import api from '../services/api';


export default function Immobile() {
    const history = useHistory();


    const [initialPosition, setInitialPosition] = useState<[number, number]>([-16.6806871,-49.2565673]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([-16.6806871,-49.2565673]);

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstruction] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);
       
    const Markers = () => {
        const map = useMapEvents({
            click(e) {                                
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);                
            },            
        })

        return (
            selectedPosition ? 
                <Marker           
                  key={selectedPosition[0]}
                  icon={markerMapIcon}
                  position={selectedPosition}
                  interactive={false} 
                />
            : null
        )
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
      if(!event.target.files) {
        return;
      }

      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      });

      setPreviewImages(selectedImagesPreview);

    }

    async function handleSubmit(event: FormEvent) {
      event.preventDefault();

      const [latitude, longitude] = selectedPosition;

      const data = new FormData();

      data.append('name', name);
      data.append('about', about);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('instructions', instructions);
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(open_on_weekends));

      images.forEach(image => {
        data.append('images', image);
      })

      await api.post('properties', data);

      alert('Cadastro realizado com sucesso!');
      history.push('/app');

    }
    
    return (
        <div id="page-create-immobile">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-immobile-form">
                    <fieldset>
                        <legend>Preencha os dados do imóvel que deseja cadastrar indicando a sua localização no mapa!</legend>

                        <MapContainer
                            center={initialPosition}
                            style={{width: '100vh', height: 280 }}
                            zoom={15}
                        >

                          <TileLayer
                              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"  
                          />  
                          <Markers />
                            
                        </MapContainer>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input 
                              id="name" 
                              value={name}
                              onChange={event => setName(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 1200 caracteres</span></label>
                            <textarea 
                              id="name" 
                              maxLength={1200} 
                              value={about}
                              onChange={event => setAbout(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="image">Fotos</label>
                            
                            <div className="images-container">
                              
                              {previewImages.map(image => {
                                return(
                                  <img key={image} src={image} alt={name} />
                                )
                              })}

                              <label htmlFor="image[]" className="new-image">
                                  <FiPlus size={24} color="#ff9a04" />
                              </label>
                            </div>

                            <input multiple onChange={handleSelectImages} type="file" id="image[]" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Agendamento</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea 
                              id="instructions" 
                              value={instructions}
                              onChange={event => setInstruction(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="opening-hours">Horário de Atendimento</label>
                            <input 
                              id="opening-hours"
                              value={opening_hours}
                              onChange={event => setOpeningHours(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende no final de semana</label>

                            <div className="button-select">
                                  <button 
                                    type="button" 
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                  >
                                    Sim
                                  </button>
                                  <button 
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}
                                  >
                                    Não
                                  </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>

                </form>
            </main>
        </div>
    );
}