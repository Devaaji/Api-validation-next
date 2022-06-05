import User from '../models/User.js';


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            status: 200,
            error: false,
            data: users
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).send({
            status: 200,
            error: false,
            data: {
                message: "Your Account Approved log in!"
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({
            status: 200,
            error: false,
            data: {
                message: "USer has been deleted!"
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}