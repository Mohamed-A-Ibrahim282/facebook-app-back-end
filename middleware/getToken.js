import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
      const decoded = verify(token, 'your_jwt_secret');
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized' });
    }
  };