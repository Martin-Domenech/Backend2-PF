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

router.delete("/:pid", async (req,res) => {
    try {
        const pid = req.params.pid;
        const result = await productModel.findByIdAndDelete(pid);
        if (result) {
            res.status(200).json({ message: 'Producto eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
})



export default router