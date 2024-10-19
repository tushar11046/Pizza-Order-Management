import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    ingredients: {
        type: [String],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'accepted',
    }
}, {timestamps: true});

export default mongoose.model('Order', orderSchema, 'orders');