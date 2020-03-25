const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


//create schema
let ProductSchema = new Schema({
    name: {type: String, required: true, max: 20},
    price: {type: Number, required: true},
    category: {type: String, required: true, max: 20},
});

//for creating and auto-incrementing id field
ProductSchema.plugin(AutoIncrement, {inc_field: 'id'});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);