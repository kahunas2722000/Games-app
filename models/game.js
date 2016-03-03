var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var gameSchema = new Schema({
    alive:{type:Boolean,required:true,default:false} // this will be our way of either showing or not showing to end users .. ie moderator will check for errors or bad language ect.
    ,game_title:{type:String,required:true,index:{unique:true}}
    ,number_of_people:{type:Number,required:true ,  index: { unique: false }}
    ,age_Range : { type: Number, min: 0, max: 65 ,default:5}

    ,game_equipment:[{type:String,trim:true,required:true,default:"No Equipment"}]
    ,indoor:{type:Boolean,required:true}
    ,daytime:{type:Boolean,required:true}
    ,game_type:{type:String,required:true,default:"General"}
    ,game_description:{type:String,trim:true,required:true,default:"Description is Unavailable at this time."}
    ,activity_level:{type:Number,required:true,default:1}
    ,game_rules:{type:String,trim:true,required:true,default:"Game Rules are unavailable at this time."}
    ,image_url:{type:String,trim:true,required:false,default:"https://dresslikethehulk.files.wordpress.com/2012/05/game.gif"}
    ,video_url:{type:String,trime:true,required:false,default:null}
    ,team_game:{type:Boolean,required:true,default:false}
    ,game_contributor:{type:String,trim:true,required:true,index:{unique:false}}
    ,show_users_name:{type:Boolean,default:false}
    ,rating_one_star:{type:Number,required:false}
    ,rating_two_star:{type:Number,required:false}
    ,rating_three_star:{type:Number,required:false}
    ,rating_four_star:{type:Number,required:false}
    ,rating_five_star:{type:Number,required:false}
    ,total_ratings:{type:Number,required:false}
    ,average_rating:{type:Number}
    ,date_created: { type: Date, required: true, default: Date.now }
    ,comments:[
        {user:{type:String,trim:true}}
        ,{comment:{type:String,trim:false}}
        ,{date_posted:{type:Date,required:true,default:Date.now()}}
        ,{rating:{type:Number ,min:1,max:5}}
    ]




});


var game = mongoose.model('game', gameSchema);

module.exports = {
    Game: game
};





/*
// example use

var Thing = mongoose.model('Thing', schema);

var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = new Buffer(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.save(callback);*/
