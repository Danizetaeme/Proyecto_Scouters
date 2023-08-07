import React, { useContext } from 'react';
import './InformCard.css';
import { Link } from 'react-router-dom';
import { InformsContext } from '../../Context/Context';
import { PlayersContext } from '../../Context/Context';

export function InformCards() {
  const { informsData } = useContext(InformsContext);
  const { data, getAbreviacionPosicion } = useContext(PlayersContext);
  const backgroundImageUrl = 'https://images.pexels.com/photos/4559555/pexels-photo-4559555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  // Verificar si data existe y es un array antes de llamar a map
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div className="nuevocontainer">
      {informsData.map((informs) => {
        console.log("informsData:", informsData);
        console.log("informs:", informs);

        // Obtener la fecha en formato de objeto Date
        const fechaInforme = new Date(informs.Created_At);

        // Obtener el día, mes y año de la fecha
        const dia = String(fechaInforme.getDate()).padStart(2, '0');
        const mes = String(fechaInforme.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes, ya que en JavaScript los meses son indexados desde 0 (enero es 0, febrero es 1, etc.)
        const año = String(fechaInforme.getFullYear()).slice(-2); // Obtenemos los últimos dos dígitos del año 

        const player = data.find((playerData) => playerData.jugador._id === informs.PlayerId);
        console.log("player:", player);

        // Obtener la posición abreviada
        const posicionAbreviada = getAbreviacionPosicion(player ? player.jugador.Posición : 'Posición Desconocida');

        // Verificar si informs.MediaInforme tiene un valor numérico o asignar 0 si es undefined
        const informMediaInforme = typeof informs.MediaInforme === 'number' ? informs.MediaInforme : 0;

        return (
          <div className="nuevocard" key={informs.id}>
            <div className="nuevocard-main">
              <div className="nuevocard-header">
                <div className="nuevocard-header-bg"></div>
                <img className="nuevocard-image" src={backgroundImageUrl} alt="" />
              </div>
              <h1 className="nuevocard-name"> {player ? `${player.jugador.Nombre} ${player.jugador.Apellidos}` : 'Nombre del Jugador Desconocido'}
                <span>({player ? `${posicionAbreviada}` : 'Posición Desconocida'})</span></h1>

              <div className='fecha-informe'>
                <p>Fecha del Informe <span>{`${dia}/${mes}/${año}`}</span></p>
                <p>{informs.Texto}</p>
              </div>

              <div className='divider'></div>

              <div className='info-container'>
                <p className='info-column'>Ult. Eval. <span>{informMediaInforme.toFixed(1)}</span></p>
                <p className='info-column'>Informes <span>6</span></p>
                <p className='info-column'>Prox.Seguim. <span>05/10/23</span></p>
              </div>

              <div className="nuevobutton-container">
                <Link to="#">
                  <button className="nuevorompedor-button">Leer Más</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
