/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors())
const userRouter = require("./users/router.users");
const ProductsRouter = require("./produits/routerProduit")


app.listen((3000), () =>{
    console.log("server is listening on port 3000 ...");
});

app.use("/", userRouter);
app.use("/", ProductsRouter);


//
test
