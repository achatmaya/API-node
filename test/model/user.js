

// eslint-disable-next-line no-undef
const myBdd = require('./Bdd');
class User{

    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;  
    }
   register(){
    const bdd = myBdd.bdd();
   var request= "insert into Users(username,role,email,password) values(? ,'user', ? , ?) ";
    bdd.query(request,[this.username, this.email, this.password] ,function(err){
        if(err) throw err;
        console.log("user insert");
    });
   
}
login(email, password){
        
    const bdd = myBdd.bdd();
    var myUser = new User();
    const request = `select username, email from Users where email = ? and password = ? `;
    bdd.query(request, [email, password],function(err, results){
        if(err) throw err;
        myUser.username = JSON.stringify(results[0].username);
        myUser.email = results[0].email;
    });
    return myUser;
}
selectAllUsers(){
    const bdd = myBdd.bdd();
    const request = "select *  from Users where role = 'user' ";
    bdd.query(request, function(err, results){
        if(err) throw err;
        console.log(JSON.stringify(results[0].username));
    }); 
}
}

// eslint-disable-next-line no-undef
exports.User = User;
var newUser = new User();

newUser = newUser.login("b@gmail.com", '123');
console.log(newUser.email);
console.log(newUser.username);
