import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Person, Star, Notifications } from '@mui/icons-material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import DescriptionIcon from '@mui/icons-material/Description';
import './Header.css';

export function Header() {
    return (
        <header className="header">
            <Link to="/" className="header__company">
               
                <h1 className="header__company-name">Scouters</h1>
                <span className='header__company-badge'>NEW ERA</span>
              
            </Link>

            <div className="header__menu">
                <Link to="/jugadores" className="header__menu-item">
                    <span className="header__menu-icon"><SportsSoccerIcon /></span>
                    Jugadores
                </Link>
                <Link to="/informes" className="header__menu-item">
                    <span className="header__menu-icon"><DescriptionIcon /></span>
                    Informes
                </Link>
            </div>


            <div className="header__search">
                <input type="text" className="header__search-input" placeholder="Buscar" />
                <Search className="header__search-icon" />
            </div>
            <div className="header__profile">
                <Person className="header__profile-icon" />
            </div>
            <div className="header__favorites">
                <Star className="header__favorites-icon" />
            </div>
            <div className="header__notifications">
                <Notifications className="header__notifications-icon" />
            </div>
        </header>
    );
}
