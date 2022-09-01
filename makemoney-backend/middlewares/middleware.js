//---------Middleware use to authenticate api----------

//-----------Use different externel module-----------
var jwt = require('jsonwebtoken');


//----------Use different  internal module----------
var logger = require('../configuration/logger/logger').logger

function checkNullBodyParam(req, res, next) {
    try {
        logger.info('Middleware :: checkNullBodyParam start')
        var collectkey = []

        //Seperate the keys and check null and push
        Object.keys(req.body).forEach(a => {

            //check condition
            if (req.body[a] == null || req.body[a] == undefined || req.body[a] == " "|| req.body[a] == "") {

                collectkey.push(a)
            }

        })
        
        if (collectkey.length === 0) {
            next()
        }
        else {
            res.status(500).json({ status: "Content should not be null,undefiend or blank" });
        }


    }
    catch (error) {
       
        logger.error('Middleware :: checkNullBodyParam .Catch Error :' + error)
        res.status(500).json({ status: error });
    }
}

function headerAuthorization(req,res,next){
    try{
        logger.info('Middleware  :: headerAuthorization start')
        var token=req.headers.authorization     //We get token from headers.authorization
        var decode= jwt.verify(token, 'secret');    //verifies the token & secret key
        req.usertoken=decode; 
      
        next();


    }catch(err){
        logger.error('Middleare  ::  headerAuthorization catch error : '+err)
        res.status(500).json({status :err})
    }

}
module.exports = {
    checkNullBodyParam,
    headerAuthorization
}