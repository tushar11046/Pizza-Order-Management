import Joi from 'joi';

import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { RefreshToken, User } from '../../models'
import { REFRESH_SECRET } from '../../config'
import JwtService from '../../services/JwtService';

const registerController = {
    async register(req, res, next){
        //User Validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            confirm_password: Joi.ref("password"),
        })

        const { error } = registerSchema.validate(req.body);

        //Validation Error
        if(error){
            return next(error);
        }

        //Check if user already exists
        try{
            const user = await User.exists({email: req.body.email});
            if(user){
                return next(CustomErrorHandler.userAlreadyExists("User Already Exists!"))
            }
        }
        catch(err){
            return next(err);
        }

        //Now since there is no error, lets register the user with the given details
        const { name, email, password } = req.body;

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Prepare a model
        const user = new User({
            name,
            email,
            password: hashedPassword,
        }) 

        let access_token;
        let refresh_token;
        try{
            const result = await user.save();
            console.log(result);
            access_token = JwtService.sign({_id: result._id, role: result.role});
            refresh_token = JwtService.sign({_id: result._id, role: result.role}, '1y', REFRESH_SECRET);

            await RefreshToken.create({
                token: refresh_token
            })
        }
        catch(err){
            return next(err);
        }


        res.json({
            access_token,
            refresh_token
        })
    }
}

export default registerController;