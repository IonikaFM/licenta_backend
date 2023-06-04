const express = require("express");
const { createNewComment } = require("./controller");
const router = express.Router();
const Comment = require("./model");

router.post("/", async (req, res) => {
	try {
		let { user, data, date, reportId, userEmail } = req.body;

		const newComment = await createNewComment({
			user,
			data,
			date,
			reportId,
			userEmail,
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

		return res.json(comments);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
