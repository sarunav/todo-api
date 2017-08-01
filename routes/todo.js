// Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

// Model
var Todos = require('../models/todo');

Todos.methods(['get', 'put', 'post', 'delete']);

router.post('/todo/add', (req, res) => {
    var todo = new Todos({
        name: req.body.name,
        completed: req.body.completed,
        note: req.body.note
    })
    todo.save((err) => {
        if(err)
            console.log(err)
        else
            console.log("Todo created successfuly!!");
            res.send("Todo created successfuly!!")
    })
});

router.get('/todos', (req, res) => {
    Todos.find({}, (err, result) => {
        if(err)
            console.log(err)
        else
            res.send(result);
    })
});

router.get('/todos/:Id', (req, res) => {
    // console.log(req.params.Id)
    Todos.findById(req.params.Id, (err, result) => {
        if(err)
            console.log(err)
        else
           res.send(result); 
    })
});

router.post('/todo/edit/:Id', (req, res) => {
    Todos.findById({ _id: ObjectId(req.body.Id)}, (err, update) => {
        if(err){
            console.log(err);
            res.status(500).send(err)
        } else {
            update.name = req.body.name,
            update.completed = req.body.completed,
            update.note = req.body.note

            update.save((err, result) => {
                if(err){
                    res.status(500).send(err)
                } else {
                    res.send(result);
                }
            });
        }
    });
});

router.post('/todo/delete/:Id', (req, res) => {
    console.log(req.body.Id)
    Todos.findByIdAndRemove({ _id: ObjectId(req.body.Id) }, 
    (err, result) => {      
        if (err) {
            console.log("error")
            res.send(400, "Error in delete")
        } else {
            res.send(200, "Deleted Successfully !!")
        }
    });
})



module.exports = router;