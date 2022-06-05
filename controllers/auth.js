import User from '../models/User.js';
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);

        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })
        const cekEmail = await User.findOne({ email: req.body.email });
        if (cekEmail)
            return res.status(404).send({
                status: 404,
                error: true,
                data: {
                    message: "Email was already exists!"
                }
            });

        await newUser.save();
        res.status(200).send({ status: 200, error: false, data: { message: "Success registered!" } });

    } catch (error) {
        console.log(error.message);
    }
}
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(403).send({
                status: 403,
                error: true,
                data: {
                    message: "Wrong email or passsword!"
                }
            });
        const isPasswordCorrrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrrect)
            return res.status(403).send({
                status: 403,
                error: true,
                data: {
                    message: "Wrong email or passsword!"
                }
            });
        if (user.isVerified){
            res.status(200).send({ status: 200, error: false, data: { messages: "Login Sucess!", email: user.email } })
        }else{
            return res.status(403).send({
                status: 403,
                error: true,
                data: {
                    message: "Your not allowed to sign in!"
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserinfo = async (req, res) => {
    try {
        const user = await User.findOne({email: req.query.email});
        if(user) {
            res.status(200).json({
                status: 200,
                error: false,
                data: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    photoProfile: user.photoProfile,
                    role: user.role
                }
            })
        }else{
            return res.status(403).send({
                status: 403,
                error: true,
                data: {
                    message: "You Dont have account permissions!"
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}