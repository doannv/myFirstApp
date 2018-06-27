var mysql = require('mysql');
module.exports = {

    getLogin: function (req, res) {
        res.render('users/login', { title: 'Login' });
    },
    actionLogin: function (req, res) {
        var config = require('../db/config');
        var connection = mysql.createConnection(config);
        connection.connect();
        var input = JSON.parse(JSON.stringify(req.body));
        var username = input.username;
        var password = input.password;
        connection.query('SELECT * FROM USERS WHERE username = ?', [username], function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'Có một số lỗi xảy ra'
                })
            } else {
                if (results.length > 0) {
                    if (password == results[0].password) {
                        res.redirect('/staff');
                    } else {
                        res.json({
                            status: 'Lỗi',
                            message: "Tài khoản hoặc mật khẩu không đúng"
                        });
                    }
                }
                else {
                    res.json({
                        status: 'Lỗi',
                        message: "Tài khoản không tồn tại"
                    });
                }
            }
        });
    },
    getRegister: function (req, res) {
        res.render('users/register', { title: 'Register' });
    }
}
