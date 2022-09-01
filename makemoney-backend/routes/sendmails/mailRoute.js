//------Send mail to user or else-----

//Use different modules
var express = require('express');
var router = express.Router();

//----------Use different  internal fuctionality----------
var logger = require('../../configuration/logger/logger').logger
var mailService=require('../../services/mailServices')
const checkNullBodyParam=require('../../middlewares/middleware').checkNullBodyParam


//------Send otp to user------
router.post('/valid',checkNullBodyParam,async function(req,res){
    logger.info("Route :: mailroute validate start")
    try{
        await mailService.validateEmail(req.body.verifyName,req.body.verifyKey).then(resSendMail=>{
            res.status(200).json({status:resSendMail})

        })

    }catch(err){
        logger.error("Route :: mailroute catch error : "+err)
        res.status(500).json({status:"Email not send"})
    }
})

module.exports=router;