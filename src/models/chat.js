(function() {
  var ObjectId, Schema, mongoose;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  ObjectId = Schema.ObjectId;

  module.exports.ChatSchema = new Schema({
    message: String,
    userId: String,
    friendlyName: String,
    roomId: String,
    created: Date
  });

  module.exports.ChatSchema.pre("save", function(next) {
    this.created = Date.now();
    return next();
  });

  mongoose.model("Chat", module.exports.ChatSchema);

}).call(this);
