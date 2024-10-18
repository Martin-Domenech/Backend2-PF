import { Router } from "express"
import { addToCart, removeToCart, createTicket } from "../controllers/cartController.js"
import { passportCall } from "../middlewares/passportCall.js"

const router = Router()

router.put('/:cid/product/:pid', passportCall('jwt'), addToCart)
router.delete('/:cid/product/:pid', passportCall('jwt'), removeToCart)
router.post('/:cid/purchase', passportCall('jwt'), createTicket)

export default router
