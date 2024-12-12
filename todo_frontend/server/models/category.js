const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // References the 'users' collection
        required: true
    }
});

const CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;
