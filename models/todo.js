// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var todoSchema = mongoose.Schema({
    name: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    note: {
        type: String
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = restful.model('todos', todoSchema);