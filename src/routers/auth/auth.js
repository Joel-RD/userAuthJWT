import { Router } from "express";
import { executeQuery } from "../../models/DB.js";
import { hashgenerator, comparePassword } from "../../utils/encrypt.js";
import { validationData } from "../../utils/validation.js";
import jwt from "jsonwebtoken";
import {verifyToken} from "../../utils/validation.js"

const router = Router();

const {SECRET_JWT_KEY} = process.env;


router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;    
    validationData.validateName(username);
    validationData.validateEmail(email);
    validationData.validatePassword(password);
    
    const result = await executeQuery(
      `SELECT email FROM users WHERE email = '${email}'`
    );

    if (result.rowCount > 0) {
      return res.status(400).send("User already exists");
    }

    const hash = await hashgenerator(password);

    await executeQuery(
      `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hash}')`
    );

    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al registrar usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    validationData.validateEmail(email);
    validationData.validatePassword(password);

    const result = await executeQuery(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (result.rowCount === 0) {
      console.log(result);
      return res.status(400).send("User not found, Please register first");
    }

    const hashPassword = result.rows[0].password;

    if (!(await comparePassword(password, hashPassword))) {
      return res.status(400).send("Incorrect password");
    }

    const token = jwt.sign(
      {userName: result.rows[0].username, userEmail: result.rows[0].email}, SECRET_JWT_KEY, {
        expiresIn: "1h"
      }
    )

    res
      .cookie('access_token', token, {
        httpOnly:true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 // 1 hour
      })
      .send("User logged in");    
  } catch (error) {
    res.status(500).send("¡Ups!... ❌ Algo salio mal ❌");
    console.error(error);
  }
})

router.post('/logout', verifyToken, (req, res) => {
  res.clearCookie('access_token');
  res.redirect('/home')
})

export default router;

