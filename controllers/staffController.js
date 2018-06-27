var mysql = require('mysql');
module.exports = {
    getListStaff: function (req, res) {
        var config = require('../db/config');
        var dataBase = mysql.createConnection(config);
        dataBase.connect();
        var staff = null;
        dataBase.query('select * from staff', function (err, rows) {
            if (err) throw err;
            staff = rows;
            dataBase.end();
            res.render('staff/index', { listStaffs: staff, title: 'Staff' });
        });
    },

    getAddStaff: function (req, res) {
        res.render('staff/insert', { title: 'Thêm nhân viên' });
    },
    addStaff: function (req, res) {
        var config = require('../db/config');
        var dataBase = mysql.createConnection(config);
        dataBase.connect();

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            code: input.code,
            name: input.name,
            birthday: input.birthday
        };
        var query = dataBase.query("INSERT INTO staff set ? ", data, function (err, rows) {
            if (err) throw err;
            dataBase.end();
            res.redirect('/staff');

        });
    },
    deleteStaff: function (req, res) {
        var config = require('../db/config');
        var dataBase = mysql.createConnection(config);
        dataBase.connect();
        var sql = "DELETE FROM staff where id =" + req.params.id;
        dataBase.query(sql, function (err, rows) {
            if (err) throw err;
            dataBase.end();
            res.redirect('/staff');
        });
    },
    getUpdate: function (req, res) {
        var config = require('../db/config');
        var dataBase = mysql.createConnection(config);
        dataBase.connect();
        var staff = null;
        var sql = "SELECT * FROM staff where id =" + req.params.id;
        dataBase.query(sql, function (err, rows) {
            if (err) throw err;
            staff = rows;
            dataBase.end();
            res.render('staff/update', { staffs: staff });
        });
    },
    postUpdateStaff: function (req, res) {
        var config = require('../db/config');
        var dataBase = mysql.createConnection(config);
        dataBase.connect();
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            code: input.code,
            name: input.name,
            birthday: input.birthday
        };
        dataBase.query("UPDATE staff SET ? WHERE ? ", [data, { id: req.body.id }], function (err, rows) {
            if (err) throw err;
            dataBase.end();
            res.redirect('/staff');
        });
    },
}