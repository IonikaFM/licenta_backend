const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportDetailsSchema = new Schema({
  size: String,
  colors: [String],
  injured: Boolean,
  agressive: Boolean,
});

const ReportSchema = new Schema({
  // type: {
  //   type: String,
  //   enum: ["FOUND", "LOST"],
  //   required: true,
  // },
  image: String,
  details: ReportDetailsSchema,
  latitude: Number,
  longitude: Number,
  date: Date,
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
