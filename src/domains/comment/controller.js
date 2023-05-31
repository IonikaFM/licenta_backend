const Comment = require("./model");

const createNewComment = async (receivedData) => {
	try {
		const { user, data, date, reportId } = receivedData;

		const newComment = new Comment({
			user,
			data,
			date,
			reportId,
		});

		const createdComment = await newComment.save();
		return createdComment;
	} catch (error) {
		throw error;
	}
};

module.exports = { createNewComment };
