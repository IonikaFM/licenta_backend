const express = require("express");
const { createNewReport } = require("./controller");
const router = express.Router();
const Report = require("./model");

router.post("/", async (req, res) => {
    try {
        let { image, details, latitude, longitude, date } = req.body;

        const newReport = await createNewReport({
            image,
            details,
            latitude,
            longitude,
            date,
        });

        res.status(200).json(newReport);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const report = await Report.findById(id); // Find the report by its ID

        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        return res.json(report);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
