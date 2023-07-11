import React from 'react';
import './App.css';
import { Registro } from './Pages/LoginYRegistro/Registro';
import { Login } from './Pages/LoginYRegistro/Login';
import { AuthContext } from './AuthContext/AuthContext';
import { useContext } from 'react';
import { BrowserRouter,Routes,Route,Navigate, } from 'react-router-dom';
import { Error } from './Pages/LoginYRegistro/Error';
import { Cuenta } from './Pages/LoginYRegistro/Cuenta';





export function App() {
  const {isLoggedIn } = useContext(AuthContext);
  return ( 
   
  
      <BrowserRouter> 
          <Routes>
            {/* <Route path="/" element={<Navbar/>} /> */}
            <Route path='/login' element={<Login/>} />
            <Route path='/error' element={<Error/>} />
            <Route path='/registro' element={<Registro/>} />
            <Route path='/cuenta' element={<Cuenta/>} />

             {/* <Route path='/confirm/:token'element={isLoggedIn ? <Login /> : <Navigate to='/login'/>} /> */}
             <Route path='/cuenta'element={isLoggedIn ? <Cuenta /> : <Navigate to='/login'/>} />
          </Routes>
    </BrowserRouter>

  );
}



