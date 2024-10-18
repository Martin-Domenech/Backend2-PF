import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// Hashear la password
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//Validar password
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)


export default __dirname