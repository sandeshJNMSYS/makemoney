//----------User profie user----------

//Use different modules
var express = require('express');
var router = express.Router();


//----------Use different  internal fuctionality----------
var logger = require('../../configuration/logger/logger').logger
const usersService = require('../../services/usersServices')
const commonService = require('../../services/commonServices')
const checkNullBodyParam=require('../../middlewares/middleware').checkNullBodyParam
const headerAuthorization=require('../../middlewares/middleware').headerAuthorization




//----------Login user----------
router.post('/signin',checkNullBodyParam, async function (req, res, next) {
  logger.info('Routes :: users signin start : ' + JSON.stringify(req.body))
  try {

    //Check credential
    var loginResponce = await usersService.userLogin(req.body)

    //Create validator
    var validatorResponce = await commonService.createValidator(req.body.verifyName)

    res.status(200).json({ status: loginResponce, validator: validatorResponce });

  } catch (err) {

    logger.error('Routes :: users signin catch error : ' + err)
    res.status(500).send({ error: err });

  }
});


//----------Registration user----------
router.post('/signup',checkNullBodyParam,async function (req, res, next) {
  logger.info('Routes :: users signup start : ' + JSON.stringify(req.body))
  try {
    //Register all details of user
    await usersService.userRegister(req.body)
    res.status(200).json({ status: "Successfully registered" });
  } catch (err) {

    logger.error('Routes :: users signup catch error : ' + err)
    res.status(500).json({ status: err });

  }
});

//----------Pan authentication----------
router.post('/panAuthenticate',async function(req,res){
  logger.info('UserRoute :: panAuthenticate start')
  try{
    var url="https://live.zoop.one/api/v1/in/identity/pan/lite"
    var headers= {
      'app-id': '6156a3f90552cf001eb079ea',
      'api-key': 'Q5V9PTH-GHM4GDC-M0XWY2V-8S9NYQW'
  }
    var body= {
      "data": {
          "customer_pan_number": req.body.panNumber,
          "consent": "Y",
          "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
      }
  }
    await commonService.callRestApi("POST",url,headers,body).then(rescall=>{
      var responceSend=[];
      if(rescall.response_code == 100){
        
        res.status(200).json({status:"ok"})
      }
     
    })
  }catch(err){
    logger.error('UserRoute :: panAuthrnticate catch error : '+err)
    res.status(500).json({status:err})
  }
})
module.exports = router;
