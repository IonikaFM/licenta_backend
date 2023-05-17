const Report = require("./model");

const createNewReport = async (data) => {
    try {
        const { image, details, latitude, longitude, date } = data;

        const existingReport = await Report.findOne({ image });

        if (existingReport) {
            throw Error("Report with the provided image already exists");
        }

        const newReport = new Report({
            image,
            details,
            latitude,
            longitude,
            date,
        });
        const createdReport = await newReport.save();
        return createdReport;
    } catch (error) {
        throw error;
    }
};

module.exports = { createNewReport };
