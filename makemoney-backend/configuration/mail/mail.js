//---------Configure sendmail settings---------

//----------Use external modules-----------
const nodemailer = require("nodemailer-promise");


//----------Use different  internal module----------
var mailConnection = require('../../configuration/.env').mailConnection

//----------Configure nodemailer setting--------
const transporter = nodemailer.config({
    host: mailConnection.host,
    port: 465,
    secure: true,
    debug: true,
    logger: true,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: mailConnection.user,
        pass: mailConnection.pass
    }
});

module.exports={
    transporter 
}


