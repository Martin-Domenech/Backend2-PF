import userModel from "../models/user.model.js"

export default class User {

    findUserByEmail = async (email) => {
        try {
            return await userModel.findOne({ email })
        } catch (error) {
            throw new Error('Error al buscar usuario por email')
        }
    }

    createUser = async (user) => {
        try {
            return await userModel.create(user)
        } catch (error) {
            throw new Error('Error al crear usuario')
        }
    }

    updateUser = async (user) => {
        try {
            return await userModel.findByIdAndUpdate(user._id, user, { new: true });
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }
    
}