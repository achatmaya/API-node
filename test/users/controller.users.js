/* eslint-disable no-undef */
const { create, selectUserById, selectAllUsers, delateUser, updateUser, selectUserByEmail, updatePAssword } = require("./model.users");
const {genSaltSync, hashSync, compareSync,} = require("bcrypt");
const {generatePassword} = require("../function/generatePassword")
require('dotenv').config();
const secretKey = "123query"
const jwt = require("jsonwebtoken");
// eslint-disable-next-line no-undef
module.exports = 
{
    createUser : (req, res) => {
        //check l'existance du user
        const body = req.body;

        let isExist = true;
        selectUserByEmail(body.email, (error, results) => {
           if(error) {
            return res.status(400).json({
                data: "user already exist"
            })
           }
           if (!results) {
            isExist = false;
           }

           if (isExist) {
            return res.status(400).json({
                data: "user already exist"
            })
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        role = 'user';
        const data = {
            username: body.username,
            email: body.email,
            role : role,
            password: body.password,
            alredyConnect : 2
        }
        
        
        create(data, (err, results) => {
            if(err){
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            return res.status(201).json({
                sucress : 1,
                data : results
            });
        });

        });

    },
    createUserByAdmin : (req, res) => {
        //check l'existance du user
        const body = req.body;
        let isExist = true;
        let password ;
        selectUserByEmail(body.email, (error, results) => {
           if(error) {
            return res.status(400).json({
                data: "user already exist"
            })
           }
           if (!results) {
            isExist = false;
           }

           if (isExist) {
            return res.status(400).json({
                data: "user already exist"
            })
        }
        password = generatePassword();
        const salt = genSaltSync(10);
       let  passwordDataBase = hashSync(password , salt);
        const data = {
            username: body.username,
            email: body.email,
            role : body.role,
            password: passwordDataBase,
            alredyConnect: 1
        }
        
        
        create(data, (err, results) => {
            if(err){
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            return res.status(201).json({
                sucress : 1,
                data : results
            });
        });

        });

    },


    getUser: (req, res) =>{
        let token = req.get("authorization");
        
        token = jwt.decode(token.slice(7)).result;
        selectUserById(token.id, (err, myUser) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            if(!myUser){
                return res.json({
                    message : "there is no id in database"
                }); 
            }
           else  return res.json(myUser);
        });
    },
    getAllUsers: (req, res) =>{
        selectAllUsers( (err, myUser) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            return res.json(myUser);
        });
    },
    updateUser: (req, res) =>{
        const body = req.body;
        let data;
        token = req.get("Authorization").slice(7);
        console.log(token)
        token = jwt.decode(token).result;
        // if(token.role != "admin"){
        //      data = {
        //         id : token.id,
        //         username: body.username,
        //         email: body.email,
        //         password: body.password,
        //         Adresse: body.Adresse
        //     }
        // }
             data = {
                id : token.id,
                username: body.username,
                email: body.email,
                 password: body.password,
                adresse: body.adresse
            }
        
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password , salt);
        updateUser(data, (err, results) => {
            if(err){
                console.log(err);
                return res.status(404).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            return res.status(200).json({
                sucress : 1,
                data : results
            });
        });
    },
    updateOnPassword: (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        updatePAssword(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            if(!results){
                return res.status(500).json({
                    sucress : 0,
                    message : "email doesn't exist"
                }); 
            }
            return res.status(200).json({
                sucress : 1,
                data : results
            });
        });
    },

    updatePassword: (req, res) =>{
        const body = req.body
        let token = req.get("authorization");
        token = jwt.decode(token.slice(7)).result;
        selectUserById(token.id, (err, result) =>{
            if(err){
                return res.status(400).json({
                    success : 0,
                    message: "failed to connect to the database"
                })

            }
            else {
                console.log(result.password)
                const statut = compareSync(body.oldPassword , result.password)
                console.log(statut)

                if(statut){
                    const salt = genSaltSync(10);
                    body.newPassword = hashSync(body.newPassword , salt);
                    const data = {
                        password: body.newPassword,
                        email : token.email
                    }
                    updatePAssword(data, (err, results) => {
                        if(err){
                            console.log(err);
                            return res.status(500).json({
                                sucress : 0,
                                message : "database connection filed"
                            });
                        }
                        if(!results){
                            return res.status(500).json({
                                sucress : 0,
                                message : "email doesn't exist"
                            }); 
                        }
                        return res.status(200).json({
                            sucress : 1,
                            data : results
                        });
                    });
                }
                else{
                    return res.status(400).json({
                        success : 0,
                        message : "the password is not correct please try again"
                    })
                }
            }
        })
       
    },
    delateUser: (req, res) =>{
        const body = req.body;
        let idUser;
        let token = req.get("authorization");
        token = jwt.decode(token.slice(7)).result;
        if(token.role != "admin"){
            idUser = token.id
        }
        else idUser = body.id
        delateUser(idUser, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            return res.status(200).json({
                sucress : 1,
                message : "user deleted succesfully",
                data : results
            });
        });
    },
    

    login: (req, res) =>{
        const body = req.body;
        if(!body.email){
            return res.status(400).json({
                success : 0,
                message: "enter a email"
            })
        }
        else if(!body.password){
            return res.status(400).json({
                success : 0,
                message: "enter a password"
            })
        }
        selectUserByEmail(body.email, (err, results) =>{
            if(err) {
               return  res.status(400).json({
                    sucess : 0,
                    message : "failed connexion to the database"
                });
            }
            if(!results) {
              return  res.status(200).json({
                    sucess : 0,
                    message : "email inccorect or doesn't exist"
                });
            }
            if(results.alredyConnect == 2){
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsonToken = jwt.sign({result : results},secretKey , {
                    expiresIn: "8h"
                });
                return res.status(200).json({ token: jsonToken});
            }
            
            else{
                return res.status(204).json({
                    sucess : 0,
                    message : "email or password inccorect"

                });
            }

        }else{
            return res.status(400).json({
                sucess : 0,
                message : "faut aller changer le mot de passe sur la route que il faut"

            });
        }  
        });
    
    },
    

};
