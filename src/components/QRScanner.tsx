import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [scanStatus, setScanStatus] = useState('');

  const handleScan = async (data) => {
    if (data) {
      console.log("Scanned Data:", data); 
      try {
        const qrData = JSON.parse(data);
        console.log("Parsed QR Data:", qrData); // Log data yang berhasil di-parse

        const response = await fetch('http://localhost:3000/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeId: qrData.employeeId,
            type: 'check-in',
          }),
        });

        if (response.ok) {
          setScanStatus('success');
          setScanResult('Attendance recorded successfully!');
        } else {
          setScanStatus('error');
          setScanResult('Failed to record attendance');
        }
      } catch (error) {
        setScanStatus('error');
        setScanResult('Invalid QR code');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setScanStatus('error');
    setScanResult('Error accessing camera');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Scan Attendance QR Code</h2>
      
      <div className="mb-6">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>

      {scanResult && (
        <div className={`p-4 rounded-md ${
          scanStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {scanResult}
        </div>
      )}
    </div>
  );
};

export default QRScanner;