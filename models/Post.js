const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    createdByUser: { type: Schema.Types.ObjectId, ref: "User" },
    media: [
      {
        type: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    location: { type: String, required: true },
    caption: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);
module.exports = model("Post", postSchema);
