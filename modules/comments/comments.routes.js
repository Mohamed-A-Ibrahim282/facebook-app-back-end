import { Router } from "express";
import { addComment, allComments, deleteComment, updateComment } from "./comments.controller.js";


const commentsRouter = Router()

commentsRouter.post('/', addComment)
commentsRouter.get('/', allComments)
commentsRouter.put('/:id', updateComment)
commentsRouter.delete('/:id', deleteComment)



export default commentsRouter