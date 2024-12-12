const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    student_id: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;