import express from "express"
import handlebars from "express-handlebars"
import __dirname from './utils.js'
import productsRouter from "./routes/products.router.js"
import mongoose from "mongoose"
// import viewsRouter from "./routes/views.router.js"


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configuracion Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine())
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

app.use("/", productsRouter) 
// app.use("/", viewsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
