import { getAllProducts, addNewProduct, removeProduct } from "../services/productService.js"

export const getAllProduct = async (req, res) => {
    try {
        const result = await getAllProducts(req.query)
        res.render("products", result)
    } catch (error) {
        console.error('Error al obtener los productos:', error.message)
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {
        const productData = {
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            status: req.body.status === 'on',
            stock: req.body.stock,
            category: req.body.category,
            thumbnails: req.body.thumbnails.split(',').map(thumbnail => thumbnail.trim())
        };
        
        await addNewProduct(productData)
        res.status(201).redirect('/')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await productService.removeProduct(pid)
        
        if (result) {
            res.status(200).json({ message: 'Producto eliminado con éxito' })
        } else {
            res.status(404).json({ message: 'Producto no encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error })
    }
}