import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tinchodome@gmail.com',
        pass: 'dqzz pcyt iomr ofzg',
    }
})

export const sendTicketEmail = async (email, ticket) => {
    const mailOptions = {
        from: 'tinchodome@gmail.com',
        to: email,
        subject: 'Confirmación de compra - Ticket generado',
        text: `¡Gracias por tu compra! Aquí tienes los detalles de tu ticket:
        
        Código del ticket: ${ticket.code}
        Fecha de compra: ${ticket.purchase_datetime}
        Total pagado: $${ticket.amount}

        Nos pondremos en contacto contigo si necesitas asistencia. ¡Gracias por elegirnos!
        `,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error al enviar el correo:', error)
    }
}