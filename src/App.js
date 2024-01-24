import React from "react";
import Form from "./form";
import Verify from "./otpverify";
import Reset from "./resetpass";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path = "/"
            element = <Form />
          />
          <Route 
            path = "/verify"
            element = <Verify />
          />
          <Route 
            path = "/resetpass"
            element = <Reset />
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
