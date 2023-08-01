<<<<<<< HEAD
import express from "express";
import { registerUser, loginUser, sendEmailWithNewToken, generateNewToken, resetPassword } from "../controllers/UsersController.js";
// import { authenticateUser } from "../authMiddelware/authMiddelware.js";
import User from "../models/UsersModel.js";
import { v4 as uuidv4 } from "uuid";
// import multer from "multer";

const router = express.Router();
// Ruta para registrar un nuevo usuario (solo accesible para administradores)
router.post("/register", registerUser,);
// router.post("/register",upload.single("nif"),registerUser, );
// Ruta para iniciar sesión
router.post("/login", loginUser);
// Generar Token
router.post("/generate-new-token", generateNewToken);

// Ruta para enviar un correo electrónico con el nuevo token
router.post("/send-email", sendEmailWithNewToken);
// Resetear password
router.post('/reset-password/:token', resetPassword);


router.get("/confirm/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ confirmationToken: token });


    const tokenExpirationTime =
      user.confirmationTokenCreatedAt.getTime() + 60000; // 1 minute in milliseconds
    const currentTime = new Date().getTime();

    if (currentTime > tokenExpirationTime) {
      // Token has expired, generate a new confirmation token
      const newToken = uuidv4();
      user.confirmationToken = newToken;
      user.confirmationTokenCreatedAt = new Date();
      await user.save();

      return res.redirect("http://localhost:3000/TokenExpirado");
    }

    user.active = 1;
    user.confirmationToken = "";
    user.confirmationTokenCreatedAt = null;
    await user.save();

    return res.redirect("http://localhost:3000/login");
  } catch (error) {
    console.error("Error al confirmar correo electrónico:", error);
    return res.redirect("http://localhost:3000/TokenExpirado");
  }
});
=======

import express from 'express';
import { registerUser, loginUser,  } from '../controllers/UsersController.js';
import { authenticateUser } from '../authMiddelware/authMiddelware.js';
import User from '../models/UsersModel.js';
;

const router = express.Router();
router.post('/register', registerUser, authenticateUser);
// Ruta para registrar un nuevo usuario (solo accesible para administradores)
router.post('/register', registerUser, authenticateUser);
// Ruta para iniciar sesión
router.post('/login', loginUser);
>>>>>>> 3de3b527cf41b12ca0381bc251df9af783333907



// Ruta para confirmar correo electrónico
router.get('/confirm/:token', async (req, res) => {
  try {
    console.log("entra")
    const token = req.params.token;
    console.log(token)
    
    const user = await User.findOne({ confirmationToken: token });
    console.log(user)
    if (!user) {
      return res.redirect('http://localhost:3000/error');
    }

   const userUpdate = await User.updateOne(
      { _id: user._id },
      { $set: { active: 1, confirmationToken: '' } }
    );
    console.log(userUpdate)

    return res.redirect('http://localhost:3000/login');
  } catch (error) {
    console.error('Error al confirmar correo electrónico:', error);
    res.status(500).json({ message: 'Error al confirmar correo electrónico' });
  }
});



router.get('/admin', authenticateUser);


export default router;






