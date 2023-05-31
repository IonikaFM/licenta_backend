const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	user: String,
	data: String,
	date: Date,
	reportId: String,
});
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
