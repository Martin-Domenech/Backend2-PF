import mongoose from "mongoose"

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    products:{
        type: [
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref: "productos"
                },
                quantity: { type: Number, required: true, default: 1 }
            }
        ],
        default:[]
    },
    totalPrice: { type: Number, required: true, default: 0 }
})
const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel