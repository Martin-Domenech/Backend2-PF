import { Router } from "express"
import productModel from "../models/product.model.js"
const router = Router()



router.post("/", async (req,res) => {
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
        res.status(201).redirect('/')

    }catch (error){
        res.status(400).json({ message: error.message });
    }
})



export default router