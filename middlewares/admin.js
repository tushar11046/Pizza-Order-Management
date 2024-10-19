import { User } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler"

const admin = async (req, res, next) => {
    console.log("In the admin middleware");
    try{
        const user = await User.findById({_id: req.user._id});

        console.log(user);
        if(user.role === 'admin'){
            next();
        }
        else{
            return next(CustomErrorHandler.unAuthorizedAccess());
        }
    }
    catch(err){
        console.log(err);
        return next(CustomErrorHandler());
    }
};

export default admin;