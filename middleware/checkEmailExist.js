import bcrypt from 'bcrypt'
import { userModel } from '../modules/users/users.controller.js';


export const checkEmailExist = async (req, res, next) => {
    let findEmail = await userModel.findAll({
        attributes: ['email'],
        where: { email: req.body.email }
    });

    if (findEmail.length != 0) return res.status(409).json({ message: "email already exists" })
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}