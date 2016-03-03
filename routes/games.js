var Game = require('../models/game').Game;

/*
 * Game Routes
 */
exports.index = function(req, res) {



    Game.find({alive:true},{_id:false,show_users_name:false,alive:false}, function(err, docs) {

        if(!err) {
            res.json(200, { game: docs });
        } else {
            res.json(500, { message: err });
        }
    });

}






exports.show = function(req, res) {

    var id = req.params.id; // The id of the workout the user wants to look up.
    Game.findById(id, function(err, doc) {
        if(!err && doc) {
            res.json(200, doc);
        } else if(err) {
            res.json(500, { message: "Error loading workout." + err});
        } else {
            res.json(404, { message: "Workout not found."});
        }
    });
}

exports.create = function(req, res) {

   // var workout_name = req.body.workout_name; // Name of workout.
   // var description = req.body.workout_description;  // Description of the workout

    var gameTitle = req.body.GAME_TITLE;
    var numberOfPeople = req.body.NUMBER_OF_PEOPLE;
    var ageRange = req.body.AGE_RANGE;
    var gameEquipment = req.body.GAME_EQUIPMENT;
    var indoorVar = req.body.IN_DOOR;
    var daytimeVar = req.body.DAY_TIME;
    var gameType = req.body.GAME_TYPE;
    var gameDescription = req.body.GAME_DESCRIPTION;
    var activityLevel = req.body.ACTIVITY_LEVEL;
    var gameRules = req.body.GAME_RULES;
    var imageURL = req.body.IMAGE_URL;
    var videoURL = req.body.VIDEO_URL;
    var teamGame = req.body.TEAM_GAME;
    var gameContributor = req.body.USER;



    //Workout.findOne({ name: workout_name }, function(err, doc) {  // This line is case sensitive.
    Game.findOne({ game_title: { $regex: new RegExp(gameTitle, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
        console.log("the document found was "+doc.game_title);
        if(!err && !doc) {

            var newGame = new Game();

            newGame.game_title = gameTitle;
            newGame.number_of_people = numberOfPeople;
            newGame.age_Range = ageRange;
            newGame.game_equipment = gameEquipment;
            newGame.indoor = indoorVar;
            newGame.daytime = daytimeVar;
            newGame.game_type = gameType;
            newGame.game_description = gameDescription;
            newGame.activity_level = activityLevel;
            newGame.game_rules = gameRules;
            newGame.image_url = imageURL;
            newGame.video_url = videoURL;
            newGame.team_game = teamGame;
            newGame.game_contributor = gameContributor;
            newGame.save(function(err) {

                if(!err) {
                    res.json(201, {message: "Game sent for review game: " + newGame.game_title });
                } else {
                    res.json(500, {message: "Could not send Game. Error: " + err});
                }

            });

        } else if(!err) {

            // User is trying to create a workout with a name that already exists.
            res.json(403, {message: "Game with that name already exists, please update instead of create or create a new game with a different name."});

        } else {
            res.json(500, { message: err});
        }
    });

}

exports.update = function(req, res) {

  //  var id = req.body.id;
   // var workout_name = req.body.workout_name;
   // var workout_description = req.body.workout_description;

    Game.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.name = workout_name;
            doc.description = workout_description;
            doc.save(function(err) {
                if(!err) {
                    res.json(200, {message: "Game updated: " + workout_name});
                } else {
                    res.json(500, {message: "Could not update Game. " + err});
                }
            });
        } else if(!err) {
            res.json(404, { message: "Could not find Game."});
        } else {
            res.json(500, { message: "Could not update Game." + err});
        }
    });
}

exports.delete = function(req, res) {

    var id = req.body.id;
    Game.findById(id, function (err, doc) {
        if (!err && doc) {
            doc.remove();
            res.json(200, {message: "Game removed."});
        } else if (!err) {
            res.json(404, {message: "Could not find game."});
        } else {
            res.json(403, {message: "Could not delete game. " + err});
        }
    });
}
