import { Router } from "express";
import { getAllUserProfiles, getUserAndProfile, login, register, updateProfileData, updateProfilePicture, updateUserProfile } from "../controllers/user.controller.js";
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


router.route("/get_user_and_profile").get(getUserAndProfile);

router.route("/update_profile_data").post(updateProfileData);

router.route("/users_get_all_users").get(getAllUserProfiles);



export default router;