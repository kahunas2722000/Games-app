var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var workoutSchema = new Schema({
    name          : { type: String, required: true, trim: true, index: { unique: true } }
  , description   : { type: String, required: true }
    ,picture_url:{type:String,trim:true,required:true,default:"http://lwlink3.linkwithin.com/api/click?format=go&jsonp=vglnk_145695819349211&key=8a69ede45b8445f6b533712ba9899ffb&libId=ilbf9xv00100r7tw000DLaai45rc5&loc=http%3A%2F%2Fhd-carwallpapers.blogspot.com%2F2012%2F01%2Fcool-pics-of-cars.html&v=1&out=http%3A%2F%2F3.bp.blogspot.com%2F-AAWlsJtmi4A%2FTw7MY42mLAI%2FAAAAAAAAAJg%2FcCISwYhs_Cw%2Fs1600%2Fcool_pics_of_cars%2B7.jpg&ref=https%3A%2F%2Fwww.searchlock.com%2F&title=Hd-Car%20wallpapers%3A%20cool%20pics%20of%20cars&txt="}
  , date_created  : { type: Date, required: true, default: Date.now }
});

var workout = mongoose.model('workout', workoutSchema);

module.exports = {
  Workout: workout
};