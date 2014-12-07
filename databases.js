function dbs() {

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'codetalk'
    });
    
    connection.connect();
    
    this.getUsers = function(callback, error) {
        error = error || null;
        connection.query('SELECT name FROM ct_users LIMIT 0, 30', function(err, rows, fields) {
            if (err) {
                if (error != null) {
                    error(err);
                }
            } else {
                callback(rows);
            }
        });
    }
    this.cekLogin = function(username, password, callback, error) {
        error = error || null;
        connection.query('SELECT name FROM ct_users WHERE name = "' + username + '" AND password = "' + password + '"', function(err, rows, fields) {
            if (err) {
                if (error != null) {
                    error(err);
                }
            } else {
                callback(rows);
            }
        });
    }

};


module.exports = new dbs();