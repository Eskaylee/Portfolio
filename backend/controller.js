let schema = require('./schema')

let nodeMailer = require('nodemailer')
async function sendMessage(name,email,message){
    try {
        const Message = await schema.create({name,email,message})
        if(!Message){
            console.log(`error occurred at sendMessage`);
            return { error: true, message: 'Failed to create message' };
                    
        }
        console.log(`user created `);
        sendEmail(name, email, message)
        return{
            error: false,
            data: Message
        }
        

    } catch (error) {
        console.log(`error creating message`);
        console.log(error);
        return{
            error:true,
            data: error.message
        }
    }    
}

async function findUser(){
    try {
        const findMessage =await schema.find()
        if(!findMessage){
            console.log(`error occurred `);
            return;
        }
        else{
            console.log(findMessage);
            return{
                error: false,
                data: findMessage
                
            }
            
        }
    } catch (error) {
        console.log(`error occurred while finding the user`);
        return{
            error: true,
            data: error.user
        }
        
    }    
}


async function findUserMessage(user){
    try {
        let userMessage = await schema.find({name:user})
        if(!userMessage){
            console.log(`the user${user} doesn't exist`);
            return{
                error: true,
                message: `the user ${user} doesn't exist`
            }
            
            
        }
        else{
            console.log(userMessage);
            return{
                error: false,
                data: userMessage
            }
            
        }
    } catch (error) {
        console.log(`error occurred while finding the user`);
        return{
            error: true,
            message: error.message
        }
        
    }
}
async function sendEmail(name, email, message) {
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true, // Secure connection using TLS
            auth: {
                user: 'Owodunni.Dataworld@gmail.com',
                pass: 'ujuz xtkd bbph jxdn', // App password
            },
            tls: {
                rejectUnauthorized: false
            },
            socketTimeout: 60000 // 60 seconds
        });

        const mailOptions = {
            from: email,
            to: 'Owodunni.Dataworld@gmail.com',
            subject: 'This is from your portfolio Website',
            text: `My name is ${name}`, // Fallback text-only content
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
                    <h1 style="color: #007BFF;">Message from ${name}</h1>
                    <p style="font-size: 16px;">${message}</p>
                    <footer style="margin-top: 20px; font-size: 14px; color: #555;">
                        <p>Sent by: ${email}</p>
                        <p>${new Date().toLocaleString()}</p>
                    </footer>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        const currentDateTime = new Date();
        const formattedDateTime = currentDateTime.toLocaleString();

        console.log(`Email sent on ${formattedDateTime}: ${info.response}`);
        return {
            message: `Email sent on ${formattedDateTime}: ${info.response}`
        };

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    sendMessage,findUser,findUserMessage
}