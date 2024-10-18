import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken

    if (token) {
        jwt.verify(token, config.secret_key, (err, user) => {
            if (err) {
                console.error('Error al verificar el token:', err.message);
                res.locals.isAuthenticated = false
                res.locals.user = null
                res.locals.role = null;
                return next()
            }
            req.user = user
            res.locals.isAuthenticated = true
            res.locals.user = user
            res.locals.role = user.role
            next()
        })
    } else {
        res.locals.isAuthenticated = false
        res.locals.user = null
        res.locals.role = null
        next()
    }
}