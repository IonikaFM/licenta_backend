const express = require("express");
const { createNewReport } = require("./controller");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let { id, image, details, location, date } = req.body;

        const newReport = await createNewReport({ id, image, details, location, date });

        res.status(200).json(newReport);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
