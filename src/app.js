import express from "express"
import handlebars from "express-handlebars"
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import mongoose from './config/database.js'
import viewsRouter from "./routes/views.router.js"
import Handlebars from 'handlebars'
import "./utils/handlebars-helpers.js"
import config from './config/config.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import sessionsRouter from './routes/sessions.router.js'
import { authenticateToken } from "./middlewares/authenticateToken.js"

const app = express()
const PORT = config.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initializePassport()
app.use(passport.initialize())
app.use(cookieParser())

app.use(authenticateToken)


app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers:Handlebars.helpers
}))


app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))



app.use("/api/products", productsRouter) 
app.use("/api/cart", cartsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/", viewsRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
