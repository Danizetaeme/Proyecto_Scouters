import User from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,60}$/;

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      surname,
      password,
      nif,
      club,
      country,
      city,
      phone,
      email,
      post,
    } = req.body;
    if (req.body.role) {
      return res.status(400).json({
        message: "ERROR",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "El email está en uso" });
    }

    if (!PWD_REGEX.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe tener entre 8 y 24 caracteres,incluir al menos un número,un caracter especial y una letra masyuscúla.",
      });
    }

    const newUser = new User({
      name,
      surname,
      password,
      nif,
      club,
      country,
      city,
      phone,
      email,
      post,
    });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;

    const userCreate = await newUser.save();

    if (userCreate) {
      const token = uuidv4();
      console.log("Token:", token);
      userCreate.confirmationToken = token;
      await userCreate.save();

      const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "Alejandro.902019@hotmail.com",
          pass: "tu contraseña",
        },
      });

      const mailOptions = {
        from: "alejandro.902019@hotmail.com",
        to: userCreate.email,
        subject: "Confirmación de correo electrónico",
        text: `${userCreate.nombre},Recientemente te has registrado en nuestra página Scouters. Si no has sido tú quien se ha registrado, por favor ignora este mensaje. Si has sido tú, por favor haz clic en el siguiente enlace para activar tu cuenta:  http://localhost:8000/users/confirm/${userCreate.confirmationToken} '`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo electrónico enviado: " + info.response);
        }
      });

      return res
        .status(201)
        .json({ message: "Usuario registrado correctamente" });
    }

    return res.status(500).json({ message: "Error al registrar el usuario" });
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Email o contraseña incorrecta" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      } else {
        if (existingUser.active === 0) {
          return res
            .status(400)
            .json({
              message: "El usuario no está validado,porfavor revisa tu email.",
              active: existingUser.active,
            });
        }
      }
    }

    const token = jwt.sign(
      { userId: existingUser._id, username: existingUser.name },
      "dssdgsggsdds" // Reemplaza con tu secreto para el token
    );

    res.status(200).json({ token, active: existingUser.active });
    console.log(token);
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
