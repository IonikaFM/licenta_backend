const express = require("express");
const { createNewReport } = require("./controller");
const router = express.Router();
const Report = require("./model");

router.post("/", async (req, res) => {
    try {
        let { type, image, details, latitude, longitude, date } = req.body;

        const newReport = await createNewReport({
            type,
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
    let { latitude, longitude, distance } = req.query;

    if (!latitude || !longitude || !distance) {
        return res.status(400).json({
            error: "Latitude, longitude and maximum distance are required",
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
//Exemplu de a gasi userii intr-un range limitat de locatia mea. Necesita testat

// const User = require('./models/User');
// const geocodingAPI = require('./services/geocodingAPI'); // Assuming you have a geocoding API service

// // Assuming your location is stored in variables: myAddress or myCoordinates (latitude and longitude)

// const MAX_DISTANCE = 20; // Maximum distance in kilometers

// // Calculate distance between two coordinates using the Haversine formula
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   // Haversine formula implementation
//   // ...

//   // Return the distance between the two coordinates
//   // ...
// }

// // Convert your address or location into latitude and longitude
// const myLocation = await geocodingAPI.geocode(myAddress);
// const myLatitude = myLocation.latitude;
// const myLongitude = myLocation.longitude;

// // Retrieve users from the database
// const users = await User.find();

// // Filter users within the desired distance
// const usersWithinDistance = users.filter((user) => {
//   const userLocation = await geocodingAPI.geocode(user.address);
//   const userLatitude = userLocation.latitude;
//   const userLongitude = userLocation.longitude;

//   const distance = calculateDistance(myLatitude, myLongitude, userLatitude, userLongitude);

//   return distance <= MAX_DISTANCE;
// });

// // Iterate through the filtered users and send notifications
// usersWithinDistance.forEach((user) => {
//   // Send notification to the user
//   // ...
// });
