import { Router } from "express";
const router = Router();

router.get("/home", async (req, res) => {
    res.render("home.handlebars");
});

export default router;
