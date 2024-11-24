import { Router } from "express";
import { executeQuery } from "../../models/DB.js"

const router = Router();

router.get("/home", async (req, res) => {
    res.render("home.handlebars");
});

export default router;
