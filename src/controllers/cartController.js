import { getCartDetails, addProductToCart, removeProductFromCart, createTicketService } from '../services/cartService.js'

export const getCarts = async (req, res) => {
    try {
        const { productos, cid, totalPrice } = await getCartDetails(req.user._id)
        res.render('cart', { productos, cid, totalPrice })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const pid = req.params.pid
        const userID = req.user._id

        const result = await addProductToCart(userID, pid)

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
        const { pid } = req.params
        const userID = req.user._id

        
        const result = await removeProductFromCart(userID, pid)
        
        if (result.error) {
            return res.status(result.error.status).json({ message: result.error.message })
        }
        res.status(200).json({ message: "Producto eliminado del carrito" })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto del carrito", error })
    }
}

export const createTicket = async (req, res) => {
    try {
        const { cid } = req.params
        const { amount } = req.body
        const userEmail = req.user.email

        const ticket = { 
            amount: amount,
            purchaser: userEmail
        }
        
        const result = await createTicketService(ticket, cid)
        if (result.error) {
            return res.status(result.error.status).json({ message: result.error.message })
        }
        res.status(200).json({ message: "Ticket creado con exito" })
    } catch (error) {
        res.status(500).json({ message: "Error al crear el ticket", error })
    }
}