import { sequelize } from '../../dbconnection/dbconnection.js';
import { DataTypes } from 'sequelize';

const commentModel = sequelize.define(
    'comment',
    {
        content: {
            type: DataTypes.STRING(100),
        },
        postId: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
    },
);

const addComment = async (req, res) => {
    await commentModel.create(req.body)
    res.json({ message: "added" })
}

const allComments = async (req, res) => {
    const comments = await commentModel.findAll();
    res.json({ message: "success", comments })
}

const updateComment = async (req, res) => {
    await commentModel.update(
        {
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

const deleteComment = async (req, res) => {
    await commentModel.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json({ message: "deleted" })
}

export {
    commentModel,
    addComment,
    allComments,
    updateComment,
    deleteComment,
}