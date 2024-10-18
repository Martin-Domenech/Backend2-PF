import { Router } from "express"
import { getAllProduct, addProduct, renderEditProduct } from "../controllers/productController.js"
import { getCarts } from "../controllers/cartController.js"
import { login, register } from "../controllers/userController.js"
import { passportCall } from "../middlewares/passportCall.js"
import { authorization } from "../middlewares/authorization.js"

const router = Router()

router.get("/", getAllProduct)
router.get('/cart', passportCall('jwt'), getCarts)
router.get('/login', login)
router.get('/register', register)
router.get('/addproduct', passportCall('jwt'), authorization('admin'), addProduct)
router.get('/updateProduct/:pid', passportCall('jwt'), authorization('admin'), renderEditProduct)

export default router