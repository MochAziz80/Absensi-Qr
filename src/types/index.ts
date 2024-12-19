export interface Employee {
  _id: string;
  name: string;
  position: string;
  department: string;
  employeeId: string;
}

export interface Attendance {
  _id: string;
  employeeId: Employee;
  timestamp: string;
  type: 'check-in' | 'check-out';
}

export interface DashboardStats {
  totalEmployees: number;
  todayAttendance: number;
  onTime: number;
  late: number;
}