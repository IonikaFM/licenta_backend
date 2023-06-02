const express = require("express");
const { createNewReport } = require("./controller");
const router = express.Router();
const Report = require("./model");

router.post("/", async (req, res) => {
	try {
		let { type, image, details, latitude, longitude, date, address } =
			req.body;

		const newReport = await createNewReport({
			type,
			image,
			details,
			latitude,
			longitude,
			date,
			address,
		});

		res.status(200).json(newReport);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const report = await Report.findById(id);

		if (!report) {
			return res.status(404).json({ error: "Report not found" });
		}

		return res.json(report);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

const kmToDegrees = (km, latitude) =>
	km / (111.32 * Math.cos(latitude * (Math.PI / 180)));

router.get("/", async (req, res) => {
	let { latitude, longitude, distance, reportType } = req.query;

	if (!latitude || !longitude || !distance || !reportType) {
		return res.status(400).json({
			error: "Latitude, longitude, maximum distance and report type are required",
		});
	}

	const latDegrees = parseFloat(latitude);
	const lonDegrees = parseFloat(longitude);
	const distanceKm = parseFloat(distance);

	const distanceDegrees = kmToDegrees(distanceKm, latDegrees);

	try {
		const reports = await Report.find({
			latitude: {
				$gte: latDegrees - distanceDegrees,
				$lte: latDegrees + distanceDegrees,
			},
			longitude: {
				$gte: lonDegrees - distanceDegrees,
				$lte: lonDegrees + distanceDegrees,
			},
			type: reportType,
		});

		return res.json({ reports });
	} catch (err) {
		console.error("Error retrieving reports", err);
		return res
			.status(500)
			.json({ error: "An error occurred while retrieving reports" });
	}
});

module.exports = router;
