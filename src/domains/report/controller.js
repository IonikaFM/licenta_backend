const Report = require("./model");

const createNewReport = async (data) => {
	try {
		const {
			type,
			image,
			details,
			latitude,
			longitude,
			date,
			address,
			userEmail,
		} = data;

		const existingReport = await Report.findOne({ image });

		if (existingReport) {
			throw Error("Report with the provided image already exists");
		}

		const newReport = new Report({
			type,
			image,
			details,
			latitude,
			longitude,
			date,
			address,
			userEmail,
		});
		const createdReport = await newReport.save();
		return createdReport;
	} catch (error) {
		throw error;
	}
};

module.exports = { createNewReport };
