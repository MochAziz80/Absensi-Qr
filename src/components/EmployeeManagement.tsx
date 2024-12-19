import React, { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { Employee } from '../types';
import { Card } from './ui/Card';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorMessage } from './ui/ErrorMessage';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeCard } from './EmployeeCard';
import { Plus } from 'lucide-react';

export const EmployeeManagement = () => {
  const { employees, loading, error } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee._id}
            employee={employee}
            onEdit={() => handleEdit(employee)}
          />
        ))}
      </div>

      {isModalOpen && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEmployee(null);
          }}
        />
      )}
    </div>
  );
};