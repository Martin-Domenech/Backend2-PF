import { Router } from "express"
import productModel from "../models/product.model.js"
import cartModel from "../models/cart.model.js"
const router = Router()

router.get("/", async (req,res) => {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 4
    let category = req.query.category || ""

    let filtro = {}
    if (category){
        filtro.category = category
    }

    let result = await productModel.paginate(
        filtro,
        {page, limit: limit, lean: true}
    )
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : "";
    result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : "";
    result.isValid = !(page <= 0 || page > result.totalPages)

    result.pages = []
    for (let i = 1; i <= result.totalPages; i++) {
        result.pages.push({
            page: i,
            isCurrent: i === page
        });
    }

    res.render("products", {...result, category})
})

/*router.get("/", async (req,res) => {
    try{    
        let currentProducts = await productModel.find()
        const products = currentProducts.map(product => ({
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails,
            _id: product._id
        }))
        res.render('products', {products: products})
    }catch (error){
        console.error(error)
    }
}) */

router.get('/cart', async (req,res) => {
    try{
        const cart = await cartModel.findOne().populate('products.product')
        if(!cart){
            return res.status(404).json({message: "Carrito no encontrado" })
        }
        const productos = cart.products.map(p => p.product)
        res.render('cart', { productos: productos})

    }catch (error){
        res.status(500).json({ message: 'Error al obtener el carrito', error })
    }

})

export default router