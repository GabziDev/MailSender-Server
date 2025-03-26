require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: process.env.SECURE,
    auth: {
      user: process.env.AUTH_USER_EMAIL,
      pass: process.env.AUTH_USER_PASSWORD,
    },
});

let htmlContent = '';
try {
    htmlContent = fs.readFileSync(path.join(__dirname, config.html), 'utf8');
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

const mailOptions = {
    from: process.env.AUTH_USER_EMAIL,
    to: config.to,
    subject: config.subject,
    text: config.text,
    html: htmlContent,
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
}); 