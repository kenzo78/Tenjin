var mongoose = require('mongoose');

// Admin Schema
var AdminSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address: [{
        street_address: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
    }],
    username: {
        type: String
    },
    email: {
        type: String
    },
    classes: [{
        class_id: { type: [mongoose.Schema.Types.ObjectId] },
        class_title: { type: String }
    }]
});

var Admin = module.exports = mongoose.model('admin', AdminSchema);

module.exports.getAdminByUsername = function (username, callback) {
    var query = { username: username };
    Instructor.findOne(query, callback);
}

// Register Admin for Class
module.exports.register = function (info, callback) {
    admin_username = info['admin_username'];
    class_id = info['class_id'];
    class_title = info['class_title'];

    var query = { username: admin_username };
    Admin.findOneAndUpdate(
        query,
        { $push: { "classes": { class_id: class_id, class_title: class_title } } },
        { safe: true, upsert: true },
        callback
    );
}
