const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    profileImage: {
      type: String,
      default:
        "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
    },
    bannerImage: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/09/17/10/30/banner-943866_1280.jpg",
    },
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post"}],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
