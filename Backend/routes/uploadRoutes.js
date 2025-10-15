const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const ExcelData = require("../models/ExcelData");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload/excel", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    // Read Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" }); // preserve empty cells

    if (!jsonData || jsonData.length === 0) {
      return res.status(400).json({ message: "❌ Excel file is empty" });
    }

    // Convert rows into { data: {...row} }
    const formattedData = jsonData.map(row => ({ data: row }));

    // Save to MongoDB
    await ExcelData.insertMany(formattedData);

    res.json({
      message: "✅ Excel data stored successfully!",
      rows: formattedData.length,
      preview: formattedData.slice(0, 5) // preview first 5 rows
    });

  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "❌ Upload failed", error: error.message });
  }

  // Get uploaded Excel data
router.get("/get-data", async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!uploads.length) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(uploads[0].data); // send latest file's data
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to fetch data" });
  }
});

});

module.exports = router;
