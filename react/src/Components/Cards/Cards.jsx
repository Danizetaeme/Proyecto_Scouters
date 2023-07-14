// import React from 'react';
// import './Card.css';
// import { Link } from 'react-router-dom';
// import jugadorImg from './imgs/jugador.jpg';

// export function Cards() {
//   const backgroundImageUrl = jugadorImg;
//   return (
//     <div classNameName="container">
//       <div className="card">
//         <div className="card-main">
//           <div className="card-header">
//             <div className="card-header-bg"></div><img className="card-image" src={backgroundImageUrl} alt="" />
//           </div>
//           <h1 className="card-name">Ricardo Gómez</h1>

//           <div className="card-attributes">
//             <div className="card-attribute"><span className="card-attribute__value">9</span><span className="card-attribute__name">MEDIA</span></div>
//             <div className="card-attribute"><span className="card-attribute__value">8</span><span className="card-attribute__name">Skills Principales</span></div>
//             <div className="card-attribute"><span className="card-attribute__value">9</span><span className="card-attribute__name">Skills Tácticas</span></div>
//             <div className="card-attribute"><span className="card-attribute__value">10</span><span className="card-attribute__name">Skills Físicas</span></div>
//             <div className="card-attribute"><span className="card-attribute__value">16</span><span className="card-attribute__name">Edad</span></div>
//             <div className="card-attribute"><span className="card-attribute__value">1.55 m</span><span className="card-attribute__name">Estatura</span></div>
//           </div>

//           <div className="button-container">
//             <Link to="#">
//               <button className="rompedor-button">Ficha Técnica</button>
//             </Link>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }




import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import jugadorImg from './imgs/jugador.jpg';

export function Cards() {
  const backgroundImageUrl = jugadorImg;
  return (
    <div className="container">
      <div className="card">
        <div className="card-main">
          <div className="card-header">
            <div className="card-header-bg"></div>
            <img className="card-image" src={backgroundImageUrl} alt="" />
          </div>
          <h1 className="card-name">Ricardo Gómez <span>(DC)</span></h1>
          <div className="card-attributes">
            <div className="card-attribute"><span className="card-attribute__value">16</span><span className="card-attribute__name">Edad</span></div>
            <div className="card-attribute"><span className="card-attribute__value">1.55</span><span className="card-attribute__name">Estatura(m)</span></div>

            <div className="card-attribute"><span className="card-attribute__value">8</span><span className="card-attribute__name">Skills Principales</span></div>
            <div className="card-attribute"><span className="card-attribute__value">9</span><span className="card-attribute__name">Skills Tácticas</span></div>
            <div className="card-attribute"><span className="card-attribute__value">10</span><span className="card-attribute__name">Skills Físicas</span></div>
          </div>

          <div className='media-global'>
            <span className="globalmedia-name">Media</span><span className="globalmedia-number">9</span>
          </div>

          <div className="button-container">
            <Link to="#">
              <button className="rompedor-button">Ficha Técnica</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
