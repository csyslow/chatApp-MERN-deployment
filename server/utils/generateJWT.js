import jwt from 'jsonwebtoken';

const generatedJWTAndSetCookie = (userId, res) => {
    // get token by userId
    const generatedToken = jwt.sign({userId}, process.env.JWT_KEY, {
        expiresIn: '7d'
    }); //userId will be embedded in token

    //set token as a cookie and send back with res
    res.cookie('user_jwt', generatedToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        //httpOnly: true, //prevent cross-site scripting attack，cookie only for sending request and not accessable via JS
        //sameSite: "strict", // prevent CSRF attack, 只会在同站点携带cookie
        // secure: process.env.NODE_ENV !== "development"
    });
};

export default generatedJWTAndSetCookie;