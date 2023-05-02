/* eslint-disable no-undef */
const{createProducts, selectAllProducts, selectProductcById, selectProductcByUserID,updateProduct, deleteProduct} = require("./modelProduit");
require('dotenv').config();
const jwt = require("jsonwebtoken");
// eslint-disable-next-line no-undef
module.exports = 
{
    createProduct : (req, res) => {
        //check l'existance du user
        const body = req.body;
        const token = req.get("authorization");
        const UserID = jwt.decode(token.slice(7)).result.id
        const data = {
            name: body.name,
            price: body.price,
            UserID : UserID,
        }
        
        
        createProducts(data, (err, results) => {
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

    },


    getProduct: (req, res) =>{
        const id = req.params.id
        // let token = req.get("authorization");
        // token = jwt.decode(token.slice(7)).result;
        selectProductcById(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            if(!results){
                return res.json({
                    message : "there is no id in database"
                }); 
            }
           else  return res.json(results);
        });
    },
    getProducts: (req, res) =>{
        selectAllProducts( (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            if(!results){
                return res.status(400).json({
                    sucress : 0,
                    message : "there is no products"
                });
            }
            return res.json({
                products: results
            });
        });
    },

    getProductsUser:  (req, res) =>{
        const body = req.body
        console.log(body.UserID)
        selectProductcByUserID( body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            if(!results){
                return res.status(400).json({
                    sucress : 0,
                    message : "there is no products"
                });
            }
           else{ 
                return res.json({
                sucess : "helllooo",
                data: results
            });
           }
        });
    },

    updateProduct: (req, res) =>{
        const body = req.body;
        // token = req.get("Authorization").slice(7);
        // console.log(token)
        // const idUser  = jwt.decode(token).result.
        updateProduct(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(540000).json({
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
    deleteProduct: (req, res) =>{
        const id = req.params.id
        deleteProduct(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    sucress : 0,
                    message : "database connection filed"
                });
            }
            return res.status(200).json({
                sucress : 1,
                message : "product deleted succesfully",
                data : results
            });
        });
     }
    

};
