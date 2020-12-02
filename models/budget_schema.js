const mongoose = require("mongoose");
const userSchema = require("./user_schema");

const budgetSchema = new mongoose.Schema(
  {
    // user: userSchema,
    // required: true,
    //  related_data: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  // },
  { collection: "budgetData" }
);

module.exports = mongoose.model("budgetData", budgetSchema);
