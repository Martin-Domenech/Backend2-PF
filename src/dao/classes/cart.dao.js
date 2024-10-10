import cartModel from "../models/cart.model.js"

export default class Cart {

    findCart = async () => {
        return await cartModel.findOne().populate('products.product')
    }

    findCartById = async (cid) => {
        return await cartModel.findById(cid)
    }

    updateCart = async (cart) => {
        return await cart.save()
    }
}