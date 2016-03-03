var Workout = require('../models/workout').Workout;

exports.index = function(req, res) {
    Workout.find({}, function(err, docs) {
        if(!err) {
            res.json(200, { workouts: docs });
        } else {
            res.json(500, { message: err });
        }
    });
}
exports.show = function (req,res) {
    var workout_name = req.params.workout_name; // the name of the workout the user wants to look up.
    Workout.findOne({ name: { $regex: new RegExp(workout_name, "i") } }, function(err, doc){
        if(!err && doc) {
            res.json(200, doc);
        } else if(err) {

            res.json(500, { message: "Error loading The Studid Workout name." + err});
        } else {
            res.json(404, { message: "Workout name not found.The Studid Workout name"});
        }
    });
}

exports.create = function(req, res) {

    var workout_name = req.body.workout_name; // Name of workout.
    var description = req.body.workout_description;  // Description of the workout

    //Workout.findOne({ name: workout_name }, function(err, doc) {  // This line is case sensitive.
    Workout.findOne({ name: { $regex: new RegExp(workout_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
        if(!err && !doc) {

            var newWorkout = new Workout();

            newWorkout.name = workout_name;
            newWorkout.description = description;

            newWorkout.save(function(err) {

                if(!err) {
                    res.json(201, {message: "Workout created with name: " + newWorkout.name });
                } else {
                    res.json(500, {message: "Could not create workout. Error: " + err});
                }

            });

        } else if(!err) {

            // User is trying to create a workout with a name that already exists.
            res.json(403, {message: "Workout with that name already exists, please update instead of create or create a new workout with a different name."});

        } else {
            res.json(500, { message: err});
        }
    });
    exports.delete = function(req, res) {



    }
}