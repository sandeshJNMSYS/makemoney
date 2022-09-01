//----------User profie use-------------

//-----------Use different  internal fuctionality----------
var logger = require('../configuration/logger/logger').logger
var databaseConnection = require('../configuration/database/database');
const commonService = require('../services/commonServices')


//----------Function check user present in database----------
async function userLogin(data) {
    logger.info('Service :: userServices userLogin start ')
    return new Promise(function (resolve, reject) {
        try {
            //Connect database check email and password 
            databaseConnection.query(
                'SELECT * from users WHERE email=? and password=?', [data.verifyName, data.verifyKey],
                (error, rows) => {
                   
                    if (error) {
                        
                        logger.error('Service :: userServices userLogin sql error : ' + error)
                        reject(error);
                    } else {
                        if (rows.length > 0) {
                            
                            resolve('Successfully logged')
                        }
                        else {
                          
                            reject('Login failed');
                        }

                    }
                })
        } catch (err) {

            logger.error('Service :: userServices userLogin  catch error : ' + err)
            reject(err);

        }

    })
}

//----------Function insert credential in database----------
async function userRegister(data) {
    logger.info('Service :: userServices userRegister start ')
    return new Promise( async function (resolve, reject) {
        try {

            //Get current date and time asia timezone
            var currentDateTime = await commonService.createDateTimeAsian()
            //Connect database insert register data
            databaseConnection.query(
                'INSERT INTO users (name,email,password,mobile_number,dob,registration_date,gender,country,zipcode,is_blocked) VALUES (?,?,?,?,?,?,?,?,?,?)', [data.name,data.verifyName, data.verifyKey,data.mobileNumber,data.dob,currentDateTime,data.gender,data.country,data.zipcode,"F"],
                (error, rows) => {
                   
                    if (error) {
                        
                        logger.error('Service :: userServices userRegister sql error : ' + error)
                        reject(error.sqlMessage);
                    } else {

                            resolve('Successfully registered')
                    }
                })
        } catch (err) {

            logger.error('Service :: userServices userRegister  catch error : ' + err)
            reject(err);

        }

    })
}



module.exports = {
    userLogin,
    userRegister
}