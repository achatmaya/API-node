// eslint-disable-next-line no-undef
const mysql = require('mysql');

var connexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'API'
});
connexion.connect( err => {
    if(err) {
        console.log(err + "tutu");
        throw err;
    }
    console.log("connected!");
});
// eslint-disable-next-line no-undef
module.exports = connexion;
