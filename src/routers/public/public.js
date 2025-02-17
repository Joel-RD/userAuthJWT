import { Router } from "express";
const router = Router();

router.get("/home", async (req, res) => {
    res.render("home.handlebars");
});

router.all("*", (req, res) => {
    res.redirect("/home");
})

export default router;
