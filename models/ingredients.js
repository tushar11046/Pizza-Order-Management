import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    total_servings: {
        type: Number,
        required: true,
    },
    per_serving: {
        type: Number,
        required: true,
    }
});

export default mongoose.model('Ingredient', ingredientSchema, 'ingredients');