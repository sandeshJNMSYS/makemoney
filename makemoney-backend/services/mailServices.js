//------Use to send modify mail------

//------Use different internal module-----
var logger=require('../configuration/logger/logger').logger
var decryptCrypto=require('../services/commonServices')
var mailTemplate=require('../templates/emailTemplates')
var mailConnection=require('../configuration/mail/mail').transporter;
var configEnv=require('../configuration/.env')

//-----Send OTP for email validation-----
async function validateEmail(email,otp){
    return new Promise(async function(resolve,reject){
    logger.info("MailService :: validateEmail start")
    try{
        await decryptCrypto.decryptCrypto(otp,configEnv.validateEmailKey).then(async res=>{
           
            var mailOptions = {
                from: configEnv.mailConnection.user,
                to: `${email}`,
                subject: 'Welcome to bigbforex.com',
                html: mailTemplate.validateTemplate(res)
            };
            await mailConnection(mailOptions)
            resolve("success")
        })

    }catch(err){
        logger.error("MailService :: validateEmail catch error : "+err)
        reject(err)

    }
})
}

module.exports={
    validateEmail

}