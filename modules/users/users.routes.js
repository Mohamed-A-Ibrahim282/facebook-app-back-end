import { Router } from "express";
import { logout, signin, signup, specificUser } from "./users.controller.js";
import { checkEmailExist } from "../../middleware/checkEmailExist.js";
import { authenticate } from "../../middleware/getToken.js";

const usersRouter = Router()

usersRouter.post('/signup',checkEmailExist, signup)
usersRouter.post('/signin', signin)
usersRouter.get('/:user_Id/posts/:post_Id', specificUser);

usersRouter.post('/logout', authenticate, logout);

export default usersRouter