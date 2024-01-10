const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    username: {type: Schema.Types.ObjectId, ref: "User"},
    photo: { type: String, required: true },
    video: { type: String },
    caption: { type: String, required: true },
    views: { type: String },
    likes: { type: String },
    comments: { type: String },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Post", postSchema);
