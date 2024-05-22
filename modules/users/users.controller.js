import { sequelize } from '../../dbconnection/dbconnection.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'
import { postModel } from '../posts/posts.controller.js';
import { commentModel } from '../comments/comments.controller.js';


const userModel = sequelize.define(
    'user',
    {
        username: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        password: {
            type: DataTypes.STRING(100),
        },
    },
);

userModel.hasMany(postModel, { foreignKey: 'author_Id' });
postModel.belongsTo(userModel, { foreignKey: 'author_Id' });

userModel.hasMany(commentModel, { foreignKey: 'userId' });
commentModel.belongsTo(userModel, { foreignKey: 'userId' });


async function signup(req, res) {
    await userModel.create(req.body);
    res.json({ message: "success" });
}

const signin = async (req, res) => {
    let findEmail = await userModel.findAll({
        attributes: ['id', 'email', 'password'],
        where: { email: req.body.email }
    });

    if (findEmail.length != 0) {
        let matchPassword = bcrypt.compareSync(req.body.password, findEmail[0].password)
        if (matchPassword) {
            res.json({ message: "login succesfully", userId: findEmail[0].id })
        } else {
            return res.status(401).json({ message: "incorrect password" })
        }
    }
    else {
        res.status(401).json({ message: "account not found" })
    }
}

const specificUser = async (req, res) => {
    const { user_Id, post_Id } = req.params;
    const user = await userModel.findByPk(user_Id, {
        include: [{
            model: postModel,
            where: { id: post_Id },
            include: [commentModel]
        }]
    });
    res.json(user);
}

const logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
  }

export {
    userModel,
    signup,
    signin,
    specificUser,
    logout
}