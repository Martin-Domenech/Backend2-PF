import { Router } from "express"
import { addToCart, removeToCart } from "../controllers/cartController.js"

const router = Router()

router.put('/:cid/product/:pid', addToCart)
router.delete('/:cid/product/:pid', removeToCart)

export default router
