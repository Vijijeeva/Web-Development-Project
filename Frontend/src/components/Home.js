import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Get-It-Visualized</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
