var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
/* GET home page. */
router.get('/', controllers.homeController.index);
//get listStaff
router.get('/staff', controllers.staffController.getListStaff);
//get page insert staff
router.get('/staff/insert', controllers.staffController.getAddStaff);
//insert staff
router.post('/staff/addStaff', controllers.staffController.addStaff);
//delete staff
router.get('/staff/delete/:id', controllers.staffController.deleteStaff);
//get page update staff
router.get('/staff/update/:id', controllers.staffController.getUpdate);

router.post('/staff/update/:id', controllers.staffController.postUpdateStaff);
module.exports = router;
