import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { DemoDataBanner } from './components/common/DemoDataBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ReportPage } from './pages/ReportPage';
import { ReportDetailsPage } from './pages/ReportDetailsPage';
import { MapPage } from './pages/MapPage';
import { DashboardPage } from './pages/DashboardPage';
import { LearnPage } from './pages/LearnPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { TrackPage } from './pages/TrackPage';
import { AdminPage } from './pages/AdminPage';
import { isDemoMode } from './services/reportService';

export const App: React.FC = () => {
  const showDemoBanner = isDemoMode();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        {/* Independent initiative disclaimer */}
        <DisclaimerBanner />

        {/* Demo Mode notification when Supabase credentials are not provided */}
        {showDemoBanner && <DemoDataBanner />}

        {/* Main Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/report/:id" element={<ReportDetailsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
