import { Router } from "express";
import { activeCheck, add_comment_to_post, createPost, delete_comment_of_user, deletePost, get_comments_by_post, getAllPosts, increment_likes } from "../controllers/posts.controller.js";
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

router.route('/')
    .get(activeCheck);

router.route("/post").post(upload.single('media'), createPost);

router.route("/posts").get(getAllPosts);

router.route("/delete_post").post(deletePost);

router.route("/comment").post(add_comment_to_post);

router.route("/get_comments").post(get_comments_by_post);

router.route("/delet_comment").delete(delete_comment_of_user);

router.route("/increment_post_like").post(increment_likes);



export default router;