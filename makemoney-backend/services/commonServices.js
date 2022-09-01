//----------For create common function-----------

//----------Use external modules----------
var jwt = require('jsonwebtoken');
var CryptoJS = require('crypto-js');
var request = require('request');

//-----------Use different  internal module------------
var logger = require('../configuration/logger/logger').logger

//----------Create validator using jwt------------
async function createValidator(data) {
    logger.info('Service :: commonServices createValidator start ')
    return new Promise(function (resolve, reject) {
        try {
            //create web token
            var token = jwt.sign({
                email: data,
            },
                //secret is the key & expiresIn defines the time period of session expire
                'secret', {
                expiresIn: "1d"
            });
            resolve(token)
        } catch (err) {

            logger.error('Service :: commonServices createValidator  catch error : ' + err)
            reject('Error');

        }

    })
}

//-----------Get current time and date asian specific----------
async function createDateTimeAsian() {
    logger.info('Service :: commonServices createDateTimeAsian start ')
    return new Promise(function (resolve, reject) {
        try {

            //Get current date and time asia timezone
            var asianDateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            currentDateTime = new Date(asianDateTime);
            resolve(currentDateTime)
        } catch (err) {

            logger.error('Service :: commonServices createDateTimeAsian  catch error : ' + err)
            reject('Error');

        }

    })
}

//-------Decrypt code ising crypto-js-----
async function decryptCrypto(data, key) {
    return new Promise(function (resolve, reject) {
        try {

            var decryptData = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
            console.log("decryptData " + decryptData)
            resolve(decryptData)


        } catch (err) {
            logger.error('Service :: commonService decryptCrypto catch error : ' + err)
            reject(err)
        }
    })
}

//----------Call third party api----------
async function callRestApi(method, url, headers, body) {
    return new Promise(function (resolve, reject) {
        logger.info('CommonServices :: callRestApi start'+" method "+method+" url "+url+" headers "+JSON.stringify(headers)+" body "+JSON.stringify(body))
        try {

            var options = {
                'method': method,
                'url': url,
                'headers':headers,
                json: true,
                body: body
            };

            request(options,function(error,responce){
                if(error){
                    reject(error)
                }
                else{
                    resolve(responce.body)
                }
            })


        } catch (err) {
            logger.error('CommonService :: callRestApi catch error : ' + err)
            reject(err)
        }
    })
}

module.exports = {
    createValidator,
    createDateTimeAsian,
    decryptCrypto,
    callRestApi
}