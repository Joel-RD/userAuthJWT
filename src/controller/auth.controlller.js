import { Router } from "express";
import { executeQuery } from "../models/DB.js";
import { hashgenerator, comparePassword } from "../utils/encrypt.js";
import { validationData } from "../utils/validation.js";
import jwt from "jsonwebtoken";

const router = Router();

const { SECRET_JWT_KEY } = process.env;

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const query = `SELECT email FROM users WHERE email = $1`;
    const params = [email];

    const result = await executeQuery(query, params);

    if (result.rowCount > 0) {
      return res.status(400).send("User already exists");
    }

    try {
      validationData.validateName(username);
      validationData.validateEmail(email);
      validationData.validatePassword(password);
    } catch (error) {
      if (error.message.includes("Email")) {
        return res.status(400).send("Invalid email, Please try again");
      } else if (error.message.includes("Contraseña")) {
        return res
          .status(400)
          .send(
            "La contraseña debe tener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula, 1 número, 1 carácter especial"
          );
      } else if (error.message.includes("Nombre")) {
        return res
          .status(400)
          .send(
            "El Nombre: Debe comenzar con una letra mayúscula y seguir con letras minúsculas"
          );
      }
    }

    const hash = await hashgenerator(password);

    const query2 = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    const params2 = [username, email, hash];

    await executeQuery(query2, params2);

    res.send("Usuario registrado correctamente").status(200);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = $1`;
    const params = [email];

    const result = await executeQuery(query, params);

    if (result.rowCount === 0) {
      return res.status(400).send("User not found, Please register first");
    }

    try {
      validationData.validateEmail(email);
      validationData.validatePassword(password);
    } catch (error) {
      if (error.message.includes("Email")) {
        return res.status(400).send("Invalid email, Please try again");
      } else if (error.message.includes("Contraseña")) {
        return res
          .status(400)
          .send(
            "La contraseña debe tener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula, 1 número, 1 carácter especial"
          );
      }
    }

    const hashPassword = result.rows[0].password;

    if (!(await comparePassword(password, hashPassword))) {
      return res.status(400).send("Incorrect password, Please try again");
    }

    const token = jwt.sign(
      { userName: result.rows[0].username, userEmail: result.rows[0].email },
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60, // 1 hour
      })
      .send("User logged in");
  } catch (error) {
    res.status(500).send("¡Ups!... ❌ Algo salio mal ❌");
    console.error(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/home");
};
