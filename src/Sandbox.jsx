import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/sandbox/Index";
function Sandbox() {
  return (
    <>
      <Routes>
        <Route index element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default Sandbox;
