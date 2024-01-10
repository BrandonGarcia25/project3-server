const { model, Schema } = require("mongoose");

const locationSchema = new Schema({
    countries:[String],  
  },
  {
    timestamps: true,
  }
);
module.exports = model("Location", locationSchema);

