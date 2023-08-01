import { useContext, useState, useEffect } from "react";
<<<<<<< HEAD
import { AuthContext } from "../../AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
=======
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext.js";
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907
import axios from "axios";
import { Button, TextField, Grid } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

export const Login = () => {
<<<<<<< HEAD
  const { username,setUsername } = useContext(AuthContext);
  const [name, setName] = useState("");
=======
  const [email, setEmail] = useState("");
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const matches = useMediaQuery("(min-width:600px)");

  const [showLoader, setShowLoader] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/users/login", {
<<<<<<< HEAD
        name,
=======
        email,
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907
        password,
      });

      if (response.status === 200) {
        setShowLoader(true);

        setTimeout(() => {
<<<<<<< HEAD
          navigate("/InterfazJugadores", {
            replace: true,
          });
        }, 3500);
        setUsername(name)
        login()
=======
          navigate("/cuenta", {
            replace: true,
          });
        }, 3500);
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907
      } else {
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        color: "black",
        backdrop: "true",
        showConfirmButton: false,
        iconColor: "black",
        background: "rgba(255,255,255,0.5)",
        text: error.response.data.message,
        timer: 2500,
        toast: "true",
        allowOutsideClick: "true",
        showCloseButton: "true",
      });
      console.error(error);
    }
  };
<<<<<<< HEAD
  // login();
=======
  login();
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907
  useEffect(() => {
    return () => {
      setShowLoader(false);
    };
  }, []);

  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.498)",
    height: "2.8rem",
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="loginForm">
        <header className="HeaderLogin">
          <h1 className="headerTitleLogin">INICIAR SESIÓN</h1>
        </header>
        <Grid
          className="gridLogin"
          container
          spacing={2}
          style={{
            width: "100%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <TextField
<<<<<<< HEAD
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
=======
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907
              InputProps={{ style: inputStyle }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{ style: inputStyle }}
            />
          </Grid>

          <Grid>
            <Button
              onClick={handleLogin}
              style={{
                background: " #C7F55C",
                margin: "auto",
                display: "flex",
                width: matches ? "15rem" : "10rem",
              }}
            >
              INICIAR SESIÓN
            </Button>
          </Grid>
        </Grid>
        <div className="loginContent">
          <span className="link1">¿ Aún no tienes cuenta?</span>
          <Link to="/registro" className="link1">
            Registrate
          </Link>
<<<<<<< HEAD
        </div>
        <div className="forgotPassword">
          <Link to="/reset-password" className="link1-reset"  >
          Olvidé mi contraseña
          </Link>
=======
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907
        </div>
      </form>
      {showLoader && <span className="loader"></span>}
    </div>
  );
<<<<<<< HEAD
};
=======
};

//*************************************---Estos son sweetALERTS//************************************************************** */
//-----------------Estos son sweetALERTS//

//   // Error en la solicitud de inicio de sesión
//   Swal.fire({
//     position: 'top-end',
//     icon: 'error',
//     title: 'Error al iniciar sesión',
//     text: 'Credenciales inválidas',
//     timer: 3000,
//     toast: true,
//   });

// Swal.fire({
//   position: 'top-end',
//   icon: 'error',
//   title: 'Error al iniciar sesión',
//   text: 'Hubo un error al iniciar sesión',
//   timer: 3000,
//   toast: true,
// });

//   Swal.fire({
//     position: 'top-end',
//     icon: 'error',
//     title: 'Error al iniciar sesión',
//     text: 'Hubo un error en el inicio de sesión automático',
//     timer: 3000,
//     toast: true,
//   });

// Swal.fire({
//   position: 'top-end',
//   icon: 'error',
//   title: 'Error al iniciar sesión',
//   text: 'Hubo un error en el inicio de sesión automático',
//   timer: 3000,
//   toast: true,
// });
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907
