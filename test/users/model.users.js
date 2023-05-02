// eslint-disable-next-line no-undef
const pool = require("../model/Bdd");

// eslint-disable-next-line no-undef
module.exports = {
    create: (data, callBack) =>{
        const request = "insert into Users(username,role,email,password,alredyConnect) values(? ,?, ? , ?,?)";
        pool.query(request, [data.username, data.role, data.email, data.password, data.alredyConnect], (error, results) => {
            if(error) { 
                return callBack(error, null);
            }
            return callBack(null, results);
        });
    },
    selectUserByEmail : (email, callBack) =>{
        const request = "select id, username, email, role, password, alredyConnect from Users where email = ? ";
        pool.query(request, [email], (error, results) =>{
            if(error) {
                return callBack(error, null);
            }
            return callBack(null, results[0]);

        });
    
    },
    selectUserById : (data, callBack) =>{
        const request = "select id, username, email,password, role, Adresse as adresse from Users where id = ?";
        pool.query(request, [data], (error, results) =>{
            if(error) return callBack(error);
               //[results.username, results.email];
            return callBack(null, results[0]);

        });
    
    },
    selectAllUsers : callBack =>{
        const request = "select id, username, role, email from Users";
        pool.query(request,[], (error, results) =>{
            if(error) return callBack(error);
            return callBack(null,results);

        });
    
    },
    updateUser : (data, callBack)=>{
        const request = "update Users" +
        " set username = ?, email = ?,  Adresse = ? where id = ?";
        pool.query(request, [data.username, data.email,data.adresse, data.id], (error, results) =>{
            if(error) return callBack(error);
               //[results.username, results.email];
            return callBack(null, results);

        });
    
    },
    updatePAssword : (data, callBack)=>{
        const request = "update Users" +
        " set password = ?, alredyConnect = 2  where email = ?";
        pool.query(request, [data.password, data.email], (error, results) =>{
            if(error) return callBack(error);
               //[results.username, results.email];
            return callBack(null, results);

        });
    
    },
    delateUser : (id, callBack) =>{
        const request = "delete from Users where id = ?"
        pool.query(request, [id], (error, results) =>{
            if(error) return callBack(error);
            return callBack(null, results);

        });
    
    }
    
    
}
