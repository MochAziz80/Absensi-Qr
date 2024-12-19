import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    todayAttendance: 0,
    onTime: 0,
    late: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const employeesResponse = await fetch('http://localhost:3000/api/employees');
      const employeesData = await employeesResponse.json();
      
      const attendanceResponse = await fetch('http://localhost:3000/api/attendance');
      const attendanceData = await attendanceResponse.json();
      
      // Calculate statistics
      const today = new Date().toISOString().split('T')[0];
      const todayAttendance = attendanceData.filter(record => 
        record.timestamp.startsWith(today)
      );

      setStats({
        totalEmployees: employeesData.length,
        todayAttendance: todayAttendance.length,
        onTime: todayAttendance.filter(record => 
          new Date(record.timestamp).getHours() < 9
        ).length,
        late: todayAttendance.filter(record => 
          new Date(record.timestamp).getHours() >= 9
        ).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalEmployees}</p>
            </div>
            <Users className="h-12 w-12 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Attendance</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.todayAttendance}</p>
            </div>
            <Clock className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Time</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.onTime}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.late}</p>
            </div>
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/generate" className="flex items-center justify-center p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Generate QR Code
          </a>
          <a href="/scan" className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Scan Attendance
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;