const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlansSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Plans", PlansSchema);
