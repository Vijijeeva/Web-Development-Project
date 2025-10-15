const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const Upload = require("../models/Upload");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup (memory storage → no disk write)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Excel API
router.post("/excel", verifyToken, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    // ✅ Read directly from buffer (no disk)
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // ✅ Save to MongoDB
    const newUpload = new Upload({
      userId: req.user.id,
      fileName: req.file.originalname,
      data: excelData,
    });

    await newUpload.save();

    // ✅ Send parsed rows back for charts
    res.json({
      message: "✅ Excel uploaded successfully",
      rows: excelData.length,
      data: excelData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Upload failed", error: err.message });
  }

});

module.exports = router;
