var express = require('express');
var router = express.Router();

Class = require('../models/class');
User = require('../models/user');
Admin = require('../models/admin');

router.get('/classes', function (req, res, next) {
    Admin.getAdminByUsername(req.user.username, function (err, admin) {
        if (err) throw err;
        res.render('admin/classes', { admin: admin });
    });
});

router.post('/classes/register', function (req, res) {
    info = [];
    info['admin_username'] = req.user.username;
    info['class_id'] = req.body.class_id;
    info['class_title'] = req.body.class_title;

    Admin.register(info, function (err, instructor) {
        if (err) throw err;
        console.log(admin);
    });

    req.flash('success_msg', 'You are now registered to teach this class');
    res.redirect('/admin/classes');
});


router.get('/classes/:id/lessons/new', function (req, res, next) {
    res.render('admin/newlesson', { class_id: req.params.id });
});

router.post('/classes/:id/lessons/new', function (req, res, next) {
    // Get Values
    var info = [];
    info['class_id'] = req.params.id;
    info['lesson_number'] = req.body.lesson_number;
    info['lesson_title'] = req.body.lesson_title;
    info['lesson_body'] = req.body.lesson_body;

    Class.addLesson(info, function (err, lesson) {
        console.log('Lesson Added..');
    });

    req.flash('success_msg', 'Lesson Added');
    res.redirect('/admin/classes');
});


module.exports = router;