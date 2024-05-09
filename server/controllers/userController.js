import UserModel from "../models/UserModel.js";

const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const otherUsers = await UserModel.find({ _id: { $ne: userId } }).select(["-password"]);
        res.status(200).json(otherUsers);
    } catch (error) {
        console.log('Error in getUsersForSidebar', error.message);
        res.status(500).json({ message: error })
    }
}

export { getUsersForSidebar }