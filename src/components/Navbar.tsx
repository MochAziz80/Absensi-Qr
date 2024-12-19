import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QrCode, Users, Clock, Home, UserPlus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/employees', icon: UserPlus, label: 'Employees' },
    { path: '/generate', icon: QrCode, label: 'Generate QR' },
    { path: '/scan', icon: Users, label: 'Scan QR' },
    { path: '/attendance', icon: Clock, label: 'Attendance' },
  ];

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <QrCode className="h-8 w-8" />
            <span className="font-bold text-xl">Office QR</span>
          </Link>
          
          <div className="flex space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 hover:text-indigo-200 transition-colors ${
                  isActive(path) ? 'text-indigo-200' : ''
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;