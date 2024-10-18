import productModel from "../models/product.model.js"

export default class Product {

    getProductsPaginated = async (filtro, page, limit, sortOptions) => {
        return await productModel.paginate(filtro, {
            page,
            limit,
            lean: true,
            sort: sortOptions
        })
    }

    createProduct = async (productData) => {
        const product = new productModel(productData)
        return await product.save()
    }

    deleteProduct = async (pid) => {
        return await productModel.findByIdAndDelete(pid)
    }

    getProductById = async (pid) => {
        return await productModel.findById(pid);
    }

    updateProduct = async (pid, productUpdates) => {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(pid, productUpdates, { new: true })
            return updatedProduct
        } catch (error) {
            throw new Error('Error al actualizar el producto en el DAO')
        }
    }
}