import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClienteList from "../components/ClienteList";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClienteList />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
