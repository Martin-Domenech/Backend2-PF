import cart from '../dao/classes/cart.dao.js'
import product from '../dao/classes/product.dao.js'

const CartDAO = new cart()
const ProductDAO = new product()

export const getCartDetails = async () => {
    const cart = await CartDAO.findCart()
    if (!cart) {
        throw new Error("Carrito no encontrado")
    }

    const productos = cart.products.map(p => p.product)
    const cid = cart._id

    return { productos, cid }
}

export const addProductToCart = async (cid, pid) => {
    const product = await ProductDAO.getProductById(pid)
    if (!product) {
        throw new Error('Producto no encontrado')
    }

    const cart = await CartDAO.findCartById(cid)
    if (!cart) {
        return null
    }

    cart.products.push({ product: product._id })
    await CartDAO.updateCart(cart)
    return true
}

export const removeProductFromCart = async (cid, pid) => {
    try {
        const cart = await CartDAO.findCartById(cid)
        if (!cart) {
            return { error: { status: 404, message: "Carrito no encontrado" } }
        }

        cart.products = cart.products.filter(prod => prod.product.toString() !== pid)
        await CartDAO.updateCart(cart)

        return { success: true }
    } catch (error) {
        throw new Error("Error al eliminar el producto del carrito")
    }
}