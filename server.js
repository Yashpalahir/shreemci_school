const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Serve static files (so index.html, styles.css, and script.js work)
app.use(express.static(__dirname));

// ✅ Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// ✅ Form submission route
app.post("/submit", (req, res) => {
    const { name, standard, mobile, vehicle, hostel } = req.body;
    console.log("Received data:", req.body);

    // ✅ Save data to JSON file
    const filePath = path.join(__dirname, "data.json");

    let existingData = [];
    if (fs.existsSync(filePath)) {
        existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    existingData.push({ name, standard, mobile, vehicle, hostel });
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.json({ message: "✅ Data saved successfully!" });
});

// ✅ Route to serve PDF from the main folder
app.get("/MCI.pdf", (req, res) => {
    res.sendFile(path.join(__dirname, "MCI.pdf"));
});

// ✅ Start server

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
