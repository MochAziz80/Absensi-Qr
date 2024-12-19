import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { EmployeeManagement } from './components/EmployeeManagement';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';
import AttendanceList from './components/AttendanceList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/generate" element={<QRGenerator />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="/attendance" element={<AttendanceList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;