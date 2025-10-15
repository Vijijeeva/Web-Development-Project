import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState(0);
  const [data, setData] = useState([]);
   const [stats, setStats] = useState({
    totalFiles: 0,
    totalAdmins: 0,
    totalUsers: 0,
  });
  // ✅ Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stats");
        setStats(res.data);
      } catch (err) {
        console.error("❌ Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload/excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setRows(res.data.rows);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed");
    }
  };
    
  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    window.location.href = "/Login";  // redirect to login page
  };
return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <div className="topbar">
        <h2>Dashboard</h2>
        <div className="nav-links">
          <a href="./Login">Home</a>
          <a href="./upload.html">Uploads</a>
          <a href="./Settings">Settings</a>
          <div> {/* 🔹 Logout Button Top Right */}
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
             Logout
          </button>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>📊 EXCEL ANALYTICS PLATFORM</h1><br></br>
          <h2><b>Introduction</b></h2>
          <p>A powerful platform for uploading any Excel file (.xls or .xlsx), analyzing the data, and generating interactive 2D and 3D charts. Users can select X and Y axes from the column headers of the Excel file, choose chart types, and generate downloadable graphs. Each user's history of uploads and analysis is saved and visible on their dashboard. Admin can manage users and data usage. The platform will optionally integrate AI APIs to provide smart insights or summary reports from the uploaded data. This Platform is a modern solution designed to simplify the way individuals and organizations handle data stored in Excel files. While Excel is widely used across industries, working with large datasets or generating insights often becomes a manual and time-consuming process. This platform addresses those limitations by providing a centralized space where users can upload spreadsheets, clean the data, analyze patterns, and generate visual reports without writing any code. By combining the simplicity of Excel with the power of automated analytics, it makes data interpretation faster, easier, and more accessible.</p>
          <h2><b>Getting Started</b></h2>
          <p>To begin working with the Excel Analytics Platform, users can upload their Excel or CSV files directly into the system. The upload process has been designed to be simple, requiring only a drag-and-drop action or file selection from the local system. Once uploaded, the platform instantly scans the file, identifies the headers, rows, and columns, and prepares it for analysis. Supported formats include .xls, .xlsx, and .csv, ensuring compatibility with most spreadsheet files. Even before starting the analysis, the platform provides important feedback such as file size, number of rows, and possible issues in the dataset.</p>
          <h2><b>“Data Processing and Insights"</b></h2>
          <h3><b>1. Data Preparation</b></h3>
          <p>Data preparation is one of the most critical steps in analytics, and the platform automates much of this work. As soon as a file is uploaded, the system checks for missing values, duplicate entries, and inconsistencies. It provides users with a summary of how many rows are incomplete and offers suggestions for cleaning the dataset. By detecting issues at this stage, the platform ensures that the results of the analysis are reliable and accurate. Users can also view column summaries, which help in understanding the type and distribution of data before diving into deeper analysis.</p>
          <h3><b>2. Data Analysis</b></h3>
          <p>Once the dataset is prepared, the analysis phase begins. The Excel Analytics Platform provides descriptive statistics such as mean, median, mode, minimum, maximum, and standard deviation for numerical columns. For datasets containing multiple variables, the system highlights correlations and patterns that might otherwise be overlooked in raw Excel files. Users can also filter and sort data across columns to focus on specific aspects of the dataset. These features eliminate the repetitive work of applying formulas manually in Excel, making the process significantly more efficient.</p>
          <h3><b>3. Data Visualization</b></h3>
          <p>Visualizing data is often the most effective way to understand it, and this platform includes several interactive visualization options. Users can create bar charts to compare categories, line charts to observe trends over time, and pie charts to view proportions within datasets. Scatter plots make it possible to explore relationships between variables, while box plots highlight outliers and distributions. Each visualization is interactive, meaning users can hover over data points for more details and adjust chart properties to suit their needs. This level of interactivity makes analysis not only more accurate but also more engaging.</p>
          <h2><b>Key Features</b></h2>
          <p>1.Excel File Upload and Parsing (using xlsx or SheetJS)<br></br>2.User & Admin Authentication (JWT based)<br></br>3.Dashboard with upload history<br></br>4.AI Tools API Integration (optional for insights or summaries)<br></br>5.Graph Generation: Support for 2D/3D charts (e.g., bar, line, pie, scatter, 3D column)<br></br>6.Data Mapping: Allow users to choose X and Y axes dynamically<br></br>7.Downloadable Charts (PNG/PDF)<br></br>8.Simple and modern responsive UI</p>
          
          <h2><b>Tech Stack & Tools</b></h2>
          <div class="tech-section">
             <div class="tech-card">
                <h3>Frontend</h3>
                    <ul>
                       <li>React.js</li>
                       <li>Redux Toolkit</li>
                       <li>Chart.js</li>
                       <li>Three.js</li>
                       <li>Tailwind CSS</li>
                    </ul>
            </div>

            <div class="tech-card">
                 <h3>Backend</h3>
                   <ul>
                       <li>Node.js</li>
                       <li>Express.js</li>
                       <li>MongoDB</li>
                       <li>Multer (file upload)</li>
                       <li>SheetJS/xlsx</li>
                   </ul>
           </div>

           <div class="tech-card">
              <h3>Optional</h3>
                 <ul>
                     <li>OpenAI or similar API for AI summaries</li>
                 </ul>
            </div>

            <div class="tech-card">
               <h3>Tools</h3>
                  <ul>
                     <li>Postman</li>
                     <li>Git/GitHub</li>
                     <li>Cloudinary (if needed for file storage)</li>
                 </ul>
            </div>
          </div>

          <h2><b>Future Scope</b></h2>
          <p>Looking ahead, the Excel Analytics Platform can be expanded in several directions. Integration with cloud-based databases will allow users to work with live data instead of static files. Real-time analytics could provide instant feedback on streaming data, which is useful for industries like finance and marketing. Collaboration features, where multiple users can work on the same dataset and share insights, will make the platform even more powerful. These future developments ensure that the platform remains scalable and relevant as data analytics continues to evolve.</p>
          <div class="references">
              <h2><b>References</b></h2>
                <p>
                  <a href="https://sheetjs.com/" target="_blank">SheetJS</a> • 
                  <a href="https://www.chartjs.org/" target="_blank">Chart.js</a> • 
                  <a href="https://threejs.org/" target="_blank">Three.js</a> • 
                  <a href="https://www.youtube.com/@javascriptmastery" target="_blank">JavaScript Mastery (YouTube)</a> • 
                  <a href="https://www.youtube.com/@Codevolution" target="_blank">Codevolution (YouTube)</a> • 
                  <a href="https://www.youtube.com/@Fireship" target="_blank">Fireship (YouTube)</a> • 
                  <a href="https://chart-studio.plotly.com/" target="_blank">Chart Studio (Plotly)</a>
                </p>
          </div>
        </div>
        </div>
        </div>
    
  );
}

export default Dashboard;
