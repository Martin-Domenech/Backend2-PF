import { getCartDetails, addProductToCart, removeProductFromCart } from '../services/cartService.js'

export const getCarts = async (req, res) => {
    try {
        const { productos, cid } = await getCartDetails()
        res.render('cart', { productos, cid })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const pid = req.params.pid
        const cid = req.params.cid

        const result = await addProductToCart(cid, pid)

        if (result) {
            res.status(200).json({ message: 'Producto agregado al carrito' })
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' })
        }
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error)
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error })
    }
}

export const removeToCart =  async (req, res) => {
    try {
        const { cid, pid } = req.params
        
        const result = await removeProductFromCart(cid, pid)
        
        if (result.error) {
            return res.status(result.error.status).json({ message: result.error.message })
        }
        res.status(200).json({ message: "Producto eliminado del carrito" })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto del carrito", error })
    }
}