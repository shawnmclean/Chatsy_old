mongoose = require "mongoose"
Schema = mongoose.Schema
ObjectId = Schema.ObjectId

module.exports.ChatSchema = new Schema(
  message: String
  userId: String
  friendlyName: String
  roomId: String
  created: Date
)
module.exports.ChatSchema.pre "save", (next) ->
  @created = Date.now()
  next()
  
mongoose.model "Chat", module.exports.ChatSchema
