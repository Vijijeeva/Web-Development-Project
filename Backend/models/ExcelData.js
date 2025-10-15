const mongoose = require("mongoose");

// Flexible schema so Excel columns will be stored
const excelSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("ExcelData", excelSchema);
