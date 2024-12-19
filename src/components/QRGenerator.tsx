import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const QRGenerator = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployee(employeeId);
    setQrData(JSON.stringify({ employeeId, timestamp: new Date().toISOString() }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Attendance QR Code</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Employee
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedEmployee}
          onChange={(e) => handleEmployeeSelect(e.target.value)}
        >
          <option value="">Select an employee...</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name} - {employee.position}
            </option>
          ))}
        </select>
      </div>

      {qrData && (
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <QRCode value={qrData} size={256} level="H" />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Scan this QR code to record your attendance
          </p>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;