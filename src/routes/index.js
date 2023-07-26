import { Router } from "express";
// import {pool} from "../database.js"
import index from "./index.routes.js";
import auth from "./auth.routes.js";

const router = Router();

router.use(index);
router.use(auth);


 

export default router;