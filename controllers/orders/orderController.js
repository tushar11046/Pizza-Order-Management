import {Order} from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import orderSchema from "../../validators/orderValidator";

const orderController = {
    async createOrder(req, res, next) {
        //Order Validation
        const { error } = orderSchema.validate(req.body);

        if(error){
            return next(CustomErrorHandler.orderValidationError(error.message));
        }
        //Validation Successful

        const { ingredients, name, amount, mobile, status, address } = req.body;

        const order = new Order({
            ingredients,
            name,
            amount,
            status,
            mobile, 
            address
        });

        try{
            const result = await order.save();
            if(result){
                res.json(result).status(200);
                return next();
            }
        }
        catch(err){
            return next(err);
        }
    },

    async updateOrder(req, res, next) {
        console.log("Inside updateOrder");
        //Validation
        const { error } = orderSchema.validate(req.body);

        if(error){
            return next(CustomErrorHandler.orderValidationError(error.message));
        }
        //Validation Success

        console.log("Validation Successful");

        const { status } = req.body;

        try{
            const result = await Order.findById({_id: req.params.id});

            if(!result){
                return next(CustomErrorHandler.orderNotExists());
            }

            const update = await Order.findByIdAndUpdate({_id: result._id }, {
                status,
            }, {new: true});

            console.log(update);

            if(update){
                res.json(update);
                res.status(200);
                return next();
            }
        }
        catch(error){
            return next(error);
        }
    },

    async getOrder(req, res, next) {
        const _id = req.params.id;

        try{
            const order = await Order.findById({_id});
            if(order){
                res.json(order).status(200);
            }
            else{
                return next(CustomErrorHandler.orderNotExists);
            }
        }
        catch(err){
            return next(err);
        }
    },

    async getAllOrders(req, res, next) {
        try {
            const allOrders = await Order.find().sort({"createdAt":-1});
            if(allOrders){
                res.json(allOrders).status(200);
            }
        }
        catch(err){
            return next(err);
        }
    }
}

export default orderController;