const Report = require("./model");

const createNewReport = async (data) => {
    try {
        const { id, image, details, location, date } = data;

        const existingReport = await Report.findOne({ id });

        if (existingReport) {
            throw Error("Report with the provided id already exists");
        }

        const newReport = new Report({
            id,
            image,
            details,
            location,
            date
        });
        const createdReport = await newReport.save();
        return createdReport;
    } catch (error) {
        throw error;
    }
}

module.exports = { createNewReport };
