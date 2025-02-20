const email = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();


const transport = email.createTransport({
    service: 'gmail',
    auth: {
        user: 'yamakibarber@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: '"YAMAKI" <yamakibarber@gmail.com>',
            to,
            subject,
            text,
            html
        };

        const info = await transport.sendMail(mailOptions);
        console.log("Correo enviado: " + info.response);
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}; 

module.exports = sendEmail;