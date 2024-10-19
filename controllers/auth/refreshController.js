import Joi from 'joi';
import { REFRESH_SECRET } from '../../config';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';

const refreshController =  {
    async refresh(req, res, next){
        
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })

        const { err } = refreshSchema.validate(req.body.refresh_token);

        if(err){
            return next(err);
        }

        let refreshToken;
        try{
            refreshToken = await RefreshToken.findOne({token: req.body.refresh_token});
            console.log(refreshToken);

            if(!refreshToken){
                return next(CustomErrorHandler.unAuthorizedAccess("No Refresh Token Found"));
            }

            let userId;
            try{
                const { _id } = await JwtService.verify(refreshToken.token, REFRESH_SECRET);
                userId = _id;
            }
            catch(err){
                return next(CustomErrorHandler.unAuthorizedAccess("Invalid Refresh Token"));
            }

            const user = await User.findOne({_id: userId});

            if(!user){
                return next(CustomErrorHandler.unAuthorizedAccess("No user found"));
            }

            // tokens
            const access_token = JwtService.sign({_id: user._id, role: user.role});
            const refresh_token = JwtService.sign({_id: user._id, role: user.role}, '1y', REFRESH_SECRET);

            await RefreshToken.create({
                token: refresh_token
            })

            res.json({access_token, refresh_token}); 
        }
        catch(err){
            return next(new Error("Something went wrong " + err.message));
        }
    }
}

export default refreshController;