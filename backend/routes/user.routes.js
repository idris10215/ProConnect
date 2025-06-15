import { Router } from "express";
import { register } from "../controllers/user.controller.js";

const router = Router();

router.route("/register")
    .post(register);


export default router;
// This code defines a route for user registration in an Express application.