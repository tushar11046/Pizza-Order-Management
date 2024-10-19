import Joi from "joi";

const ingredientSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    total_servings: Joi.number().greater(-1).required(),
    per_serving: Joi.number().min(1).required(),
});

export default ingredientSchema;