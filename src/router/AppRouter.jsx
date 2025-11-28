import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Triage_Board from "../pages/Triage_Board";
import FollowUp from "../pages/FollowUp";
import Viewer from "../pages/Viewer";
import ProductTour from "../pages/ProductTour";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound"; // 404 페이지 추가
import Navbar from "../components/layout/Navbar";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Triage_Board />} />
        <Route path="/followup" element={<FollowUp />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/tour" element={<ProductTour />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} /> {/* 404 처리 */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;