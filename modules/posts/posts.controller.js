import { sequelize } from '../../dbconnection/dbconnection.js';
import { DataTypes } from 'sequelize';
import { userModel } from './../users/users.controller.js';
import { commentModel } from '../comments/comments.controller.js';

const postModel = sequelize.define(
    'post',
    {
        title: {
            type: DataTypes.STRING(100),
        },
        content: {
            type: DataTypes.STRING(100),
        },
        author_id: {
            type: DataTypes.INTEGER,
        },
    },
);

postModel.hasMany(commentModel, { foreignKey: 'postId' });
commentModel.belongsTo(postModel, { foreignKey: 'postId' });


const addPost = async (req, res) => {
    await postModel.create(req.body)
    res.json({ message: "added" })
}

const allPosts = async (req, res) => {
    const posts = await postModel.findAll();
    res.json({ message: "success", posts })
}

const updatePost = async (req, res) => {
    await postModel.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id,
            },
        },
    )
    res.json({ message: "updeted" })
}

const deletePost = async (req, res) => {
    await postModel.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json({ message: "deleted" })
}

const specificPost = async (req, res) => {
    const post = await postModel.findOne({ where: { id: req.params.postId }, include: userModel });
    res.json(post);
  }

export {
    postModel,
    addPost,
    allPosts,
    updatePost,
    deletePost,
    specificPost,
}