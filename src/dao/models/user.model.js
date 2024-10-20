import mongoose from "mongoose"

const userCollection = "Users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    cart: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "cart",
        default: null
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
})

const firstCollection = mongoose.model(userCollection, userSchema)

export default firstCollection

 