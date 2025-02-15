import { Router } from "express";
import { verifyToken } from "../../utils/validation.js";
import { rootConfig, setConfig, rootProtected } from "../../controller/private.controller.js";


const router = Router();

router.get("/protected", verifyToken, rootProtected);

router.get("/protected/config", verifyToken, rootConfig);

router.post("/protected/set-config", verifyToken, setConfig);

export default router;

