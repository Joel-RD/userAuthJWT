import { Router } from "express";
import { validationData } from "../utils/validation.js";
import { executeQuery } from "../models/DB.js";
import { hashgenerator, comparePassword } from "../utils/encrypt.js";

const router = Router();

export const rootProtected = (req, res) => {
  res.render("private.handlebars");
};

export const rootConfig = (req, res) => {
  res.render("config.handlebars");
};

export const setConfig = async(req, res) => {
  try {
    const { new_name, new_password } = req.body;
    const {userEmail} = req.session;
    
    try {
      validationData.validateName(new_name);
      validationData.validatePassword(new_password);
    } catch (error) {
      if (error.message.includes("Nombre")) {
        return res.status(400).send("Invalid name, Please try again");
      } else if (error.message.includes("Contraseña")) {
        return res
          .status(400)
          .send(
            "La contraseña debe tener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula, 1 número, 1 carácter especial"
          );  
      }
    }

    const query = `SELECT password FROM users WHERE email = $1`;
    const params = [userEmail];
    const result = await executeQuery(query, params);
    
    const hastPassword = result.rows[0].password;

    if (await comparePassword(new_password, hastPassword)) {
      return res.status(400).send("La contraseña no puede ser igual a la antigua.");
    }

    const newHashPassword = await hashgenerator(new_password);

    const query2= `UPDATE users SET username = $1, password = $2 WHERE email = $3`;
    const params2 = [new_name, newHashPassword, userEmail];

    await executeQuery(query2, params2);

    res.send("Cambios guardados").status(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("¡Ups!... ❌ Algo salio mal ❌");
  }
};
