import User from '../dao/classes/user.dao.js'
import Cart from '../dao/classes/cart.dao.js'
import { createHash, isValidPassword } from '../utils.js'

const UserDAO = new User()
const CartDAO = new Cart()

export const authenticateUser = async (email, password) => {
    try {
        const user = await UserDAO.findUserByEmail(email)
        if (!user || !isValidPassword(user, password)) {
            return null
        }
        const { password: _, ...userData } = user.toObject()
        
        return userData
    } catch (error) {
        throw new Error('Error en la autenticación del usuario')
    }
}

export const registerUser = async (first_name, last_name, email, age, password, role) => {
    try {
        const user = await UserDAO.findUserByEmail(email)
        if (user) {
            return { success: false, message: 'El usuario ya existe' }
        }

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role
        }

        const createdUser = await UserDAO.createUser(newUser)
        const newCart = await CartDAO.createCart(createdUser._id)
        createdUser.cart = newCart._id
        await UserDAO.updateUser(createdUser)

        return { success: true }
    } catch (error) {
        throw new Error('Error al crear el usuario')
    }
}