import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

function App() {
  useEffect(() => {
    // Initialize materialize javascript
    M.AutoInit();
  });

  return (
    <div className="App">
      <h1>My App</h1>
    </div>
  );
}

export default App;
