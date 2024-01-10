const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default:
        "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
    },
    firstName: String,
    lastName: String,
    bio: String,
    // posts: relate to Post model
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
