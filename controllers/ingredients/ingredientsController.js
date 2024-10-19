import Joi from "joi";
import { Ingredient } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import ingredientSchema from "../../validators/ingredientValidator";

const ingredientsController = {
    async addIngredient(req, res, next){
        const { error } = ingredientSchema.validate(req.body);
        console.log(error);

        if(error){
            return next(CustomErrorHandler.ingredientValidationError(error.message));
        }
        //Validation Success

        try{
            const ingredient = await Ingredient.exists({name: req.body.name});
            if(ingredient){                                                
                //Ingredient already exists
                return next(CustomErrorHandler.ingredientExists());
            }
        }
        catch(err){
            return next(err);
        }

        const { name, type, total_servings, per_serving } = req.body;

        const ingredient = new Ingredient({
            name,
            type,
            total_servings,
            per_serving
        });

        let result;
        try{
            result = await ingredient.save();
        }
        catch(err){
            return next(err);
        }

        res.json({
            message: "ingredient successfully saved",
        });
    },

    async updateIngredient(req, res, next){
        const { error } = ingredientSchema.validate(req.body);

        if(error){
            return next(CustomErrorHandler.ingredientValidationError(error.message));
        }
        //Validation successful
        console.log("Validation Successful");

        const { name, type, per_serving, total_servings } = req.body;

        try{
            const result = await Ingredient.findById({_id: req.params.id});

            if(!result){
                return next(CustomErrorHandler.ingredientNotExists());
            }

            const update = await Ingredient.findByIdAndUpdate({_id: result._id }, {
                name,
                type,
                total_servings,
                per_serving,
            }, {new: true});

            console.log(update);

            if(update){
                res.json(result);
                res.status(200);
                return next();
            }
        }
        catch(error){
            return next(error);
        }
    },

    async deleteIngredient(req, res, next){
        const { err } = ingredientSchema.validate(req.body);

        if(err) {
            return next(CustomErrorHandler.ingredientValidationError());
        }

        try{
            const result = await Ingredient.findById({_id: req.params.id});

            if(!result){
                return next(CustomErrorHandler.ingredientNotExists());
            };

            const deleteResult = await Ingredient.findByIdAndDelete({_id: result._id});

            if(deleteResult){
                res.status(200).json({
                    msg: "Deleted successfully!"
                });
                return next();
            }
        }
        catch(error){
            return next(error);
        }
    },

    async getIngredient(req, res, next){
        try{
            const ingredient = await Ingredient.findById({_id: req.params.id});
            if(ingredient){
                console.log(ingredient);
                res.status(200).json({ingredient});
                return next();
            }
            else{
                return next(CustomErrorHandler.ingredientNotExists());
            }
        }
        catch(error){
            return next(error);
        }
    },

    async getAllIngredients(req, res, next){
        try{
            const ingredients = await Ingredient.find();
            if(ingredients){
                console.log(ingredients);
                res.status(200).json(ingredients);
                return next();
            }
        }
        catch(error){
            return next(error);
        }
    }
}

export default ingredientsController;