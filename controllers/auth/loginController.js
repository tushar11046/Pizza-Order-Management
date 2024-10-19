import Joi from 'joi';
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { RefreshToken, User } from '../../models';
import { REFRESH_SECRET } from '../../config'

const loginController = {
    async login(req, res, next) {
        //Validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        const { error } = loginSchema.validate(req.body);
        if(error){
            return next(error);
        }
        //Check if user isn't registered
        try{
            const { email, password } = req.body;

            const user = await User.findOne({email: email})

            if(!user){
                return next(CustomErrorHandler.noSuchUserExists());
            }

            const match = await bcrypt.compare(password, user.password);

            if(!match){
                return next(CustomErrorHandler.wrongPassword());
            }

            let access_token = JwtService.sign({_id: user._id, role: user.role});
            let refresh_token = JwtService.sign({_id: user._id, role: user.role}, '1y', REFRESH_SECRET);

            await RefreshToken.create({
                token: refresh_token
            })

            res.json({access_token, refresh_token});
        }
        catch(err){
            return next(err);
        }
    },

    async logout(req, res, next){

        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })

        const { err } = await refreshSchema.validate(req.body.refresh_token);

        if(err){
            return next(err);
        }

        try{
            const result = await RefreshToken.deleteOne({token: req.body.refresh_token});
            console.log(result);
        }
        catch(err){
            return next(err);
        }

        res.json({
            status: 1,
            msg: "Successful"
        })
    }
};

export default loginController;