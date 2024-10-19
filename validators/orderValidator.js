import Joi from "joi";

const orderSchema = Joi.object({
    ingredients: Joi.array().items(Joi.string()).required(),
    address: Joi.string().required(),
    name: Joi.string().required(),
    mobile: Joi.string().length(10).required(),
    amount: Joi.number().positive().required(),
    status: Joi.string().valid('accepted', 'preparing', 'outForDelivery', 'delivered'),
});

export default orderSchema;