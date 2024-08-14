import { Router } from "express"
import mongoose from "mongoose"
import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"

const router = Router()

router.put('/:pid', async (req,res) => {
    try{
        const pid = req.params.pid
        const product = await productModel.findById(pid)

        let cart = await cartModel.findOne()
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' })
        }
        cart.products.push({ product: product._id })
        await cart.save()

        res.status(200).json({ message: 'Producto agregado al carrito' })
    }catch (error){
        console.error('Error al agregar el producto al carrito:', error)
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error })
    }
})

router.delete('/:pid', async (req,res) => {
    try{
        const pid = req.params.pid
        const cart = await cartModel.findOne()
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" })
        }
        cart.products = cart.products.filter(prod => prod.product.toString() !== pid)
        await cart.save()
        res.status(200).json({ message: "Producto eliminado del carrito" })
        
    } catch(error){
        res.status(500).json({ message: "Error al eliminar el producto del carrito", error })
    }
})

export default router