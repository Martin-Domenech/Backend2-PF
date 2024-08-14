import express from "express"
import handlebars from "express-handlebars"
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import mongoose from "mongoose"
import viewsRouter from "./routes/views.router.js"
import cartModel from "./models/cart.model.js"




const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configuracion Handlebars como motor de plantillas
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


mongoose.connect("mongodb+srv://MartinDomenech:AAAJ@coderbackend.bfplota.mongodb.net/?retryWrites=true&w=majority&appName=coderBackend")
.then(() => {
    console.log("Conectado con la base de datos")
})
.catch(error => {
    console.error("Error al conectarse con la base de datos", error)
})

app.use("/api/products", productsRouter) 
app.use("/api/cart", cartsRouter)
app.use("/", viewsRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
