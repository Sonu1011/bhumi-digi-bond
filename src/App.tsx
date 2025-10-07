import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AddLand from "./pages/AddLand";
import MapView from "./pages/MapView";
import Verify from "./pages/Verify";
import MeasurementTool from "./pages/MeasurementTool";
import HistoryDisputes from "./pages/HistoryDisputes";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-land" element={<AddLand />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/measurement" element={<MeasurementTool />} />
        <Route path="/history" element={<HistoryDisputes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
