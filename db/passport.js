var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : 'admin'
				});

connection.query('USE firstapp');	
var bcrypt = require('bcrypt-nodejs');
// expose this function to our app using module.exports
module.exports = function(passport) {
  
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) { 
            
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'abc.')); 
                }
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'bcd.'));
                dataBase.end
                return done(null, rows[0]);
            });
        })
    );
};
