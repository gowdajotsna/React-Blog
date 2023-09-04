// homepadge of posts
import express from "express"
import { addPost ,getPosts,getPost,deletePost,updatePost} from "../controllers/post.js"
const router = express.Router()

// to make requests
router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)

export default router