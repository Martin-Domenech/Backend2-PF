import { Router } from "express"
import productModel from "../models/product.model.js"
import cartModel from "../models/cart.model.js"
const router = Router()

router.get("/", async (req,res) => {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 8
    let category = req.query.category || ""
    let sort = req.query.sort || ""

    let filtro = {}
    if (category){
        filtro.category = category
    }

    let sortOptions = {}
    if (sort === "asc"){
        sortOptions.price = 1 
    }else if (sort === "desc"){
        sortOptions.price = -1
    }

    let result = await productModel.paginate(
        filtro,
        {page, limit: limit, lean: true, sort: sortOptions}
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
    const cart = await cartModel.findOne()
    if(!cart){
        return res.status(404).json({message: "Carrito no encontrado" })
    }
    const cid = cart._id

    res.render("products", {...result, category, sort, cid})
})


router.get('/cart', async (req,res) => {
    try{
        const cart = await cartModel.findOne().populate('products.product')
        if(!cart){
            return res.status(404).json({message: "Carrito no encontrado" })
        }
        const productos = cart.products.map(p => p.product)
        const cid = cart._id

        res.render('cart', { productos, cid})

    }catch (error){
        res.status(500).json({ message: 'Error al obtener el carrito', error })
    }

})

export default router