// eslint-disable-next-line no-undef
const express = require("express");
var app = express();
//app.use(express.json());
app.listen(3000);
app.get("/users", (req, res) => {
    res.json(req.body.content);
   });
   app.get("/test", (req, res) => {
    res.send("it ok");
   });
   app.post("/maya", (req, res) =>{
    const test = req.body.surname;
    console.log(test);
    res.sendStatus(201);
   })
