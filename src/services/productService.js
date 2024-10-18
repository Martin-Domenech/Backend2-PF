import cart from "../dao/classes/cart.dao.js"
import product from "../dao/classes/product.dao.js"

const ProductDAO = new product()
const CartDAO = new cart()

export const getAllProducts = async (query) => {
    let page = parseInt(query.page) || 1
    let limit = parseInt(query.limit) || 8
    let category = query.category || ""
    let sort = query.sort || ""

    let filtro = {}
    if (category) {
        filtro.category = category
    }

    let sortOptions = {};
    if (sort === "asc") {
        sortOptions.price = 1
    } else if (sort === "desc") {
        sortOptions.price = -1
    }

    let result = await ProductDAO.getProductsPaginated(filtro, page, limit, sortOptions);

    result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : ""
    result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : ""
    result.isValid = !(page <= 0 || page > result.totalPages);


    result.pages = [];
    for (let i = 1; i <= result.totalPages; i++) {
        result.pages.push({
            page: i,
            isCurrent: i === page
        });
    }

    const cart = await CartDAO.findCart()
    if (!cart) {
        throw new Error("Carrito no encontrado")
    }

    return { ...result, category, sort, cid: cart._id }
}

export const addNewProduct = async (productData) => {
    return await ProductDAO.createProduct(productData)
}

export const removeProduct = async (pid) => {
    return await ProductDAO.deleteProduct(pid)
}

export const updateProductService = async (pid, productUpdates) => {
    try {
        return await ProductDAO.updateProduct(pid, productUpdates)
    } catch (error) {
        throw new Error('Error en el servicio de actualización de producto')
    }
}