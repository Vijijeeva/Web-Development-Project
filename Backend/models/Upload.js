import React, { useState } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";
import ThreeDChart from "./ThreeDChart";
import AxisSelector from "./AxisSelector";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]); // ✅ store uploaded data
  const [selectedAxes, setSelectedAxes] = useState({ x: "", y: "" });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("http://localhost:5000/upload/excel", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}` // ✅ needed if verifyToken
        },
      });

      console.log(res.data);
      setExcelData(res.data.data); // ✅ save excel rows for charts
      alert("Upload successful!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Upload Excel File</h2>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {excelData.length > 0 && (
        <div>
          <h3>✅ Excel Data Loaded ({excelData.length} rows)</h3>

          {/* Axis Selector */}
          <AxisSelector
            data={excelData}
            onAxisChange={(axes) => setSelectedAxes(axes)}
          />

          {/* Charts */}
          <ChartComponent data={excelData} axes={selectedAxes} />
          <ThreeDChart data={excelData} axes={selectedAxes} />
        </div>
      )}
    </div>
  );
}

export default Upload;
