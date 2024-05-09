import UserModel from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import generatedJWTAndSetCookie from "../utils/generateJWT.js";

const logInHandler = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await UserModel.findOne({username});
        // check username
        if (!user) return res.status(400).json({error: "Wrong username or password, please sign up first"});
        //check password
        const validPwd = await bcrypt.compare(password, user.password);
        if (!validPwd) return res.status(400).json({error: "Incorrect Password"});
        await generatedJWTAndSetCookie(user._id, res);
        res.status(200).json(user);
    } catch (error) {
        console.log('Error in LogInHandler');
        res.status(500).json(error.message);
    }
};

const signUpHandler = async (req, res) => {
    try {
        const { fullName, username, password, confirmedPassword, gender } = req.body;
        // api for generating random profile pics
        const malePicUrl = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femalePicUrl = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        //check uniqueness of username
        const existUser = await UserModel.findOne({ username });
        if (existUser) return res.status(400).json({error:'The username has already been registered.'});
        //check if two password are identical
        if (password !== confirmedPassword) return res.status(400).json({error:'Two passwords do not match.'});

        // Hash password
        const salt = await bcrypt.genSalt(10); //more secure with higher value (but also longer time)
        const hashedPwd = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            fullName,
            username,
            password: hashedPwd,
            gender,
            profilePicUrl: gender === 'male' ? malePicUrl : femalePicUrl
        })

        //generate jwt and set cookies
        await generatedJWTAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log('Error in SignUpHandler');
        res.status(500).json(error.message);
    };
};

const logOutHandler = (req, res) => {
    try {
        //simply reset the cookie
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:'Logged out successfully.'})
    } catch (error) {
        console.log('Error in LogOutHandler');
        res.status(500).json(error.message);
    }
};

export { logInHandler, signUpHandler, logOutHandler };