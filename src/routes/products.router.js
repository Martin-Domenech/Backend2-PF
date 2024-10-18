import { Router } from "express"
import { createProduct, deleteProduct, updateProduct } from "../controllers/productController.js"
import { passportCall } from "../middlewares/passportCall.js"
import { authorization } from "../middlewares/authorization.js"

const router = Router()

router.post("/", passportCall('jwt'), authorization('admin'), createProduct)
router.delete("/:pid", passportCall('jwt'), authorization('admin'), deleteProduct)
router.put('/:pid', passportCall('jwt'), authorization('admin'), updateProduct)


export default router