const mongoose = require("mongoose");
//const budgetSchema = require("./userBudget_schema");

const budgetSchema = new mongoose.Schema(
  {
    // user: String,
    // required: true,
    // related_data: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: number,
      required: true,
    },
    color: {
      type: string,
      required: true,
    },
  },
  { collection: "budgetData" }
);

module.exports = mongoose.model("budgetData", budgetSchema);

/*
{
  user: String,
  required: true,
  related_data: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: number,
      required: true,
    },
    color: {
      type: string,
      required: true,
    }
  }
}
*/
