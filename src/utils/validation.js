import jwt from "jsonwebtoken";
import {config} from "../../config.js";

const {console_log } = config();

export const validationData = {
  validateName: function (name) {
    const nameRegex = /^[A-Z][a-z]*( [A-Z][a-z]*)*$/;
    if (
      !nameRegex.test(name) ||
      name === "" ||
      name === undefined ||
      name === null ||
      !isNaN(name)
    ) {
      throw new Error(
        "Nombre: Debe comenzar con una letra mayúscula y seguir con letras minúsculas"
      );
    }
    return name;
  },

  validateEmail: function (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/;
    if (
      !emailRegex.test(email) ||
      email === "" ||
      email === undefined ||
      email === null ||
      !isNaN(email)
    ) {
      throw new Error(
        "Email: Debe ser Gmail, Hotmail o Outlook (ejemplo@gmail.com, ejemplo@hotmail, ejemplo@outlook)"
      );
    }
    return email;
  },

  validatePassword: function (password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (
      !passwordRegex.test(password) ||
      password === "" ||
      password === undefined ||
      password === null ||
      password === NaN
    ) {
      throw new Error(
        "Contraseña: Debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial."
      );
    }
    return password;
  },
};

const {SECRET_JWT_KEY} = process.env;

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res.redirect("/home").status(401); // No autorizado
      return;
    }

    const decode = jwt.verify(token, SECRET_JWT_KEY);
    req.session = decode;
    res.locals.user = decode;

    next();
  } catch (error) {
    console_log(error);
  }
};
