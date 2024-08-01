import mongoose from "mongoose"

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 50},
    description: {type: String, required: true, max: 1000},
    code: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean, default: true, required: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: {type: [String]}
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel