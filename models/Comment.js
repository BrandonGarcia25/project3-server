const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  createdByUser: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, required: true },
});

module.exports = model("Comment", commentSchema);
