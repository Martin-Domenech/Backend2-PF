import cartModel from "../models/cart.model.js"

export default class Cart {

    findCart = async () => {
        return await cartModel.findOne().populate('products.product')
    }

    findCartByUserId = async (userId) => {
        return await cartModel.findOne({ user: userId }).populate('products.product')
    }

    findCartById = async (cid) => {
        return await cartModel.findById(cid)
    }

    updateCart = async (cart) => {
        return await cart.save()
    }

    createCart = async (userId) => {
        return await cartModel.create({ user: userId, products: [] })
    }

    clearCartById = async (cid) => {
        try {
            const cart = await cartModel.findById(cid)
            if (!cart) {
                throw new Error('Carrito no encontrado')
            }
            cart.products = []
            cart.totalPrice = 0
            await cart.save()
            return { success: true }
        } catch (error) {
            throw new Error('Error al limpiar el carrito: ' + error.message)
        }
    }
}