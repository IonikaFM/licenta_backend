const express = require("express");
const { createNewComment } = require("./controller");
const router = express.Router();
const Comment = require("./model");

router.post("/", async (req, res) => {
	try {
		let { user, data, date, reportId } = req.body;

		const newComment = await createNewComment({
			user,
			data,
			date,
			reportId,
		});

		res.status(200).json(newComment);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const comments = await Comment.find({ reportId: id });

		if (comments.length === 0) {
			return res
				.status(404)
				.json({ error: "No comments found for the given report ID" });
		}

		return res.json(comments);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
