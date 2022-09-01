//------Template use for user coordination-----


//-----Template for validate user email------
function validateTemplate(userOtp) {
    const template = `Hello user,<br>

    Your otp for forex registration is : <h3>${userOtp}</h3>
    Use this code to get started with us.<br>
   
    Regards,<br>
    FOREX Team`

    return template;
}

module.exports={
    validateTemplate

}