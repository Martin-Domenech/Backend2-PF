import { Router } from "express"
import productModel from "../models/product.model.js"
const router = Router()



router.get("/api/products", async (req,res) => {
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
            thumbnails: product.thumbnails
        }))
        res.render('products', {products: products})
    }catch (error){
        console.error(error)
    }
})

router.post("/api/products", async (req,res) => {
    const product = new productModel({
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status === 'on',
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails.split(',').map(thumbnail => thumbnail.trim())
    })
    try{    
        const newProduct = await product.save()
        res.status(201).redirect('/api/products')

    }catch (error){
        res.status(400).json({ message: error.message });
    }
})


export default router