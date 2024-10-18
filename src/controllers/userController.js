import { authenticateUser, registerUser } from "../services/userService.js"
import jwt from "jsonwebtoken"
import config from '../config/config.js'

export const login = (req, res) => {
    res.render('login')
}

export const register = (req, res) => {
    res.render('register')
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await authenticateUser(email, password)
        if (!userData) return res.status(404).send('Datos incorrectos')

        req.user = userData

        const token = jwt.sign({ ...userData }, config.secret_key, { expiresIn: "24h" })
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000  // 1 hora
        })

        res.redirect('/')
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message)
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
    }
}

export const logoutUser = (req, res) => {
    try{
        res.clearCookie('authToken', {
            httpOnly: true
        })
        res.redirect('/')
    } catch(err){
        console.error(err)
    }
}

export const registerNewUser = async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body
    try {
        const result = await registerUser(first_name, last_name, email, age, password, role)
        if(!result.success){
            return res.status(400).send(result.message)
        }
        res.redirect('/login')
    } catch (error) {
        res.status(500).send(`Error al crear el usuario: ${error.message}`)
    }
}