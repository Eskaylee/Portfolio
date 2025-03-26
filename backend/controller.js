const schema = require('./schema')
const nodemailer = require('nodemailer')

async function sendMessage(name, email, message) {
    try {
        const Message = await schema.create({ name, email, message })
        if (!Message) {
            console.log('error occurred at sendMessage')
            return { error: true, message: 'Failed to create message' }
        }
        console.log(`user created: ${JSON.stringify(Message)}`)
        await sendEmail(name, email, message)
        return { error: false, data: Message }
    } catch (error) {
        console.error(`Error creating message: ${error.name} - ${error.message}`)
        console.error(error.stack)
        return { error: true, data: error.message }
    }
}

async function findUser() {
    try {
        const findMessage = await schema.find()
        if (!findMessage || findMessage.length === 0) {
            console.log('no users found')
            return { error: true, message: 'No users found' }
        }
        console.log(findMessage)
        return { error: false, data: findMessage }
    } catch (error) {
        console.error(`Error finding users: ${error.message}`)
        return { error: true, data: error.message }
    }
}

async function findUserMessage(user) {
    try {
        const userMessage = await schema.find({ name: user })
        if (!userMessage || userMessage.length === 0) {
            console.log(`the user ${user} doesn't exist`)
            return { error: true, message: `the user ${user} doesn't exist` }
        }
        console.log(userMessage)
        return { error: false, data: userMessage }
    } catch (error) {
        console.error(`Error finding user message: ${error.message}`)
        return { error: true, message: error.message }
    }
}

async function sendEmail(name, email, message) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            },
            socketTimeout: 60000
        })

        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Message from ${name} via Portfolio Website`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSent: ${new Date().toLocaleString()}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
                    <header style="border-bottom: 2px solid #007BFF; padding-bottom: 10px; margin-bottom: 20px;">
                        <h1 style="color: #007BFF; font-size: 24px; margin: 0;">New Contact Message</h1>
                    </header>
                    <main>
                        <p style="font-size: 16px; margin: 0 0 10px;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
                        <p style="font-size: 16px; margin: 0 0 20px;"><strong>Message:</strong></p>
                        <p style="font-size: 16px; background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 0 0 20px;">${message}</p>
                    </main>
                    <footer style="font-size: 14px; color: #555; border-top: 1px solid #eee; padding-top: 10px;">
                        <p style="margin: 0;">Sent on: ${new Date().toLocaleString()}</p>
                        <p style="margin: 5px 0 0;">This message was sent via your portfolio website.</p>
                    </footer>
                </div>
            `
        }

        const info = await transporter.sendMail(mailOptions)
        const formattedDateTime = new Date().toLocaleString()
        console.log(`Email sent on ${formattedDateTime}: ${info.response}`)
        return { message: `Email sent on ${formattedDateTime}: ${info.response}` }
    } catch (error) {
        console.error(`Error sending email: ${error.message}`)
        throw error
    }
}

module.exports = { sendMessage, findUser, findUserMessage }