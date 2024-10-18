import { Router } from "express"
import { loginUser, logoutUser, registerNewUser } from "../controllers/userController.js"

const router = Router()

router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/register', registerNewUser)


export default router