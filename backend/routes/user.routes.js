import { Router } from "express";
import { login, register, updateProfilePicture, updateUserProfile } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.route("/update_profile_picture")
    .post(upload.single("profilePicture"),updateProfilePicture);

router.route("/register")
    .post(register);

router.route("/login")
    .post(login);

router.route("/user_update").post(updateUserProfile);




export default router;