import React from 'react';
import { Employee } from '../types';
import { Card } from './ui/Card';
import { Edit2, Trash2, UserCircle } from 'lucide-react';
import { deleteEmployee } from '../utils/api';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(employee._id);
        window.location.reload();
      } catch (err) {
        console.error('Error deleting employee:', err);
      }
    }
  };

  return (
    <Card className="relative group">
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-indigo-100 p-3 rounded-full">
          <UserCircle className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{employee.name}</h3>
          <p className="text-sm text-gray-600">{employee.position}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Department</p>
            <p className="font-medium">{employee.department}</p>
          </div>
          <div>
            <p className="text-gray-500">Employee ID</p>
            <p className="font-medium">{employee.employeeId}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};