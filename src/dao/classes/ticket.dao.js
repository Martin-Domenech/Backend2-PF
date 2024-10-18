import ticketModel from "../models/ticket.model.js"

export default class Ticket {

    createTicket = async (ticket) => {
        try {
            return await ticketModel.create(ticket)
        } catch (error) {
            throw new Error('Error al crear ticket')
        }
    }
    
}  