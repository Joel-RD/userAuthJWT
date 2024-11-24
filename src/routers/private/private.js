import { Router } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../utils/validation.js";
import path from "node:path";

const router = Router();

const { SECRET_JWT_KEY } = process.env;

router.get("/protected", verifyToken, (req, res) => {
  const token = req.cookies.access_token;
  const data = jwt.verify(token, SECRET_JWT_KEY);

  res.render("private.handlebars");
});

export default router;
