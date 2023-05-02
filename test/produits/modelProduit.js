// eslint-disable-next-line no-undef
//
// eslint-disable-next-line no-undef
const pool = require("../model/Bdd")

// eslint-disable-next-line no-undef
module.exports = {
    createProducts: (data, callBack) =>{
        const request = "insert into Products(name,price,UserID) values(? , ? , ?)";
        pool.query(request, [data.name, data.price, data.UserID], (error, results) =>{
            if(error) return callBack(error);
            return callBack(null, results);
        });
    },
    selectProductcById : (data, callBack) =>{
        const request = "select id, name, price, UserID from Products where id = ? ";
        pool.query(request, [data], (error, results) =>{
            if(error) return callBack(error);
               //[results.username, results.email];
            return callBack(null, results[0]);

        });
    
    },
    selectProductcByUserID : (data, callBack) =>{
        const request = "select name, price from Products where UserID = ? order by UserID ";
        pool.query(request, [data.UserID], (error, results) =>{
            if(error){ 
                return callBack(error);
            }
               //[results.username, results.email];
               if(!results){
                console.log("hello")
               }
            return callBack(null, results);


        });
    
    },
    selectProductcByName : (name, callBack) =>{
        const request = "select name, price, UserIDfrom Products where name = ? ";
        pool.query(request, [name], (error, results) =>{
            if(error) return callBack(error);
               //[results.username, results.email];
            return callBack(null, results[0]);


        });
    
    },
    selectAllProducts : callBack =>{
        const request = "select id, name, price, UserID from Products ";
        pool.query(request, [], (error, results) =>{
            if(error) return callBack(error);
               //[results.username, results.email];
            return callBack(null, results);

        });
    
    },
    updateProduct : (data, callBack) =>{
        const request = "update Products" +
        " set name = ?, price = ? where id = ?";
        pool.query(request, [data.name, data.price,data.id], (error, results) =>{
            if(error) return callBack(error);
               //[results.username, results.email];
            return callBack(null, results);

        });
    
    },
    deleteProduct : (id, callBack) =>{
        const request = "delete from Products where id = ?"
        pool.query(request, [id], (error, results) =>{
            if(error) return callBack(error);
            return callBack(null, results);

        });
    
    }
    
    
}
