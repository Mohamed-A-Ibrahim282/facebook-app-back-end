import { Router } from "express";
import { addPost, allPosts, deletePost, specificPost, updatePost } from "./posts.controller.js";


const postsRouter = Router()

postsRouter.post('/', addPost)
postsRouter.get('/', allPosts)
postsRouter.put('/:id', updatePost)
postsRouter.delete('/:id', deletePost)

postsRouter.get('/:postId', specificPost);

export default postsRouter