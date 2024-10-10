import { Router } from "express"
import { getAllProduct } from "../controllers/productController.js"
import { getCarts } from "../controllers/cartController.js"

const router = Router()

router.get("/", getAllProduct)
router.get('/cart', getCarts)

export default router