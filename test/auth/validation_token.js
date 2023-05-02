/* eslint-disable no-undef */
//const { json } = require("body-parser");
require('dotenv').config();
const secretKey = "123query"
const jwt = require("jsonwebtoken");
module.exports = { 
    checkMiddleWear: (req, res, next )=> {
        let token = req.get("authorization");
        token = token.slice(7)
        if(!token){
            res.status(401).json({
                sucess : 0,
                message: 'Error there is no token'
            });
        }
        jwt.verify(token, secretKey, (err) =>{
            if(err){
                res.status(401).json({
                    sucess: 0,
                    message: 'bad token go and login'
                });
                console.log(err);
            }
            else{
                return next()
            }
        });
    },
    chekAdmin: (req, res, next )=> {
        let token = req.get("authorization");
        if(!token){
            res.status(401).json({
                sucess : 0,
                message: 'Error there is no token'
            });
        }
        token = token.slice(7)
        jwt.verify(token, secretKey, (err) =>{
            if(err){
                res.status(401).json({
                    sucess: 0,
                    message: 'bad token go and login'
                });
                console.log(err);
            }
            else{
                myRoleUser = jwt.decode(token).result.role
                if(myRoleUser != "admin"){
                    res.status(401).json({
                        sucess: 0,
                        message: 'access dinied'
                    });
                }
                else return next()
            }
        });
    }
}
