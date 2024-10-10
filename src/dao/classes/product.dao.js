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


}