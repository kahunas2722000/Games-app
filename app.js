/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , workouts = require('./routes/workouts')
    ,games = require('./routes/games')
    ,workoutNames = require('./routes/workoutNames')
  , mongoose = require('mongoose');

// MongoDB Connection 
mongoose.connect('mongodb://localhost/PPG');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/games', games.index);
app.del('/workouts/deleteall',workoutNames.delete)
app.get('/workouts', workouts.index);
app.get('/workoutname',workoutNames.index);
app.get('/workoutname/name/:workout_name',workoutNames.show);
app.post('/workoutname',workoutNames.create);
app.get('/workouts/:id', workouts.show);
app.post('/workouts', workouts.create);   //// post create
app.put('/workouts/PUT/', workouts.update);
app.del('/workouts', workouts.delete);








http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %s in %s mode.",  app.get('port'), app.settings.env);
});
