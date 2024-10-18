import cart from '../dao/classes/cart.dao.js'
import product from '../dao/classes/product.dao.js'
import ticket from '../dao/classes/ticket.dao.js'

const CartDAO = new cart()
const ProductDAO = new product()
const TicketDAO = new ticket()

export const getCartDetails = async (userId) => {
    let cart = await CartDAO.findCartByUserId(userId)
    
    if (!cart) {
        cart = await CartDAO.createCart(userId)
    }

    const productos = cart.products.map(p => ({
        _id: p.product._id,
        title: p.product.title,
        description: p.product.description,
        price: p.product.price,
        thumbnails: p.product.thumbnails,
        quantity: p.quantity
    }))

    const cid = cart._id
    const totalPrice = cart.totalPrice

    return { productos, cid, totalPrice }
}

export const addProductToCart = async (userId, pid) => {
    const product = await ProductDAO.getProductById(pid)
    if (!product) {
        throw new Error('Producto no encontrado')
    }

    let cart = await CartDAO.findCartByUserId(userId)
    
    if (!cart) {
        cart = await CartDAO.createCart(userId)
    }

    const existingProduct = cart.products.find(p => p.product._id.toString() === pid)

    if (existingProduct) {
        existingProduct.quantity += 1
    } else {
        cart.products.push({ product: product._id, quantity: 1 })
    }

    cart.totalPrice += product.price
    await CartDAO.updateCart(cart)
    return true
}

export const removeProductFromCart = async (userID, pid) => {
    try {
        const cart = await CartDAO.findCartByUserId(userID)
        if (!cart) {
            return { error: { status: 404, message: "Carrito no encontrado" } }
        }
        const productInCart = cart.products.find(p => p.product._id.toString() === pid)
        const product = await ProductDAO.getProductById(pid)
        if (productInCart) {
            if (productInCart.quantity > 1) {
                productInCart.quantity -= 1
                cart.totalPrice -= product.price
            } else {
                cart.products = cart.products.filter(p => p.product._id.toString() !== pid)
                cart.totalPrice -= product.price
            }
        } else {
            return { error: { status: 404, message: "Producto no encontrado en el carrito" } }
        }

        await CartDAO.updateCart(cart)
        return { success: true }
    } catch (error) {
        throw new Error("Error al eliminar el producto del carrito")
    }
}


export const createTicketService = async (ticket, cid) => {
    try {
        const result = await TicketDAO.createTicket(ticket)
        if(!result){
            throw new Error("Error al crear ticket")
        }
        
        await CartDAO.clearCartById(cid)
        return { success: true }
    } catch (error) {
        throw new Error("Error al crear ticket")
    }
}