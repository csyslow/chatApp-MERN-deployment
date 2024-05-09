import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

const protectRoute = async (req, res, next) => {
    try {
        //get set token in cookies
        const token = req.cookies.user_jwt; //cookie-parser needed
        if (!token) return res.status(401).json({ error: "Unauthorized user (jwt not exists)" });
        //verify token in req
        const decodedJwt = await jwt.verify(token, process.env.JWT_KEY); //return decoded payload obj
        if (!decodedJwt) return res.status(401).json({ error: "Unauthorized user (Invalid jwt)" });
        const { userId } = decodedJwt; // userId was a payload for endocing, we used userId to sign JWT
        const user = await UserModel.findById(userId).select("-password");
        //if user passed authorization, add target user property to req
        req.user = user;
        next(); // on to the next middleware/controller
    } catch (error) {
        console.log('Error in middleware protectRoute', error.message)
        res.status(500).json({ error: error.message })
    }
}

export default protectRoute;