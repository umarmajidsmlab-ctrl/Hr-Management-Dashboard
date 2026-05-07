export const employeesData = [
  { id: 'EMP001', name: 'Ali Raza', department: 'IT', role: 'Software Engineer', status: 'Active', joinDate: '2024-01-15', email: 'ali@example.com', avatar: 'https://i.pravatar.cc/150?u=EMP001' },
  { id: 'EMP002', name: 'Sara Khan', department: 'HR', role: 'HR Executive', status: 'Active', joinDate: '2024-02-10', email: 'sara@example.com', avatar: 'https://i.pravatar.cc/150?u=EMP002' },
  { id: 'EMP003', name: 'Usman Ahmed', department: 'Finance', role: 'Accountant', status: 'Active', joinDate: '2024-03-05', email: 'usman@example.com', avatar: 'https://i.pravatar.cc/150?u=EMP003' },
  { id: 'EMP004', name: 'Ayesha Malik', department: 'Marketing', role: 'Marketing Executive', status: 'Active', joinDate: '2024-03-20', email: 'ayesha@example.com', avatar: 'https://i.pravatar.cc/150?u=EMP004' },
  { id: 'EMP005', name: 'Bilal Hussain', department: 'Design', role: 'UI/UX Designer', status: 'On Leave', joinDate: '2024-04-01', email: 'bilal@example.com', avatar: 'https://i.pravatar.cc/150?u=EMP005' },
  { id: 'EMP006', name: 'Hamza Ali', department: 'IT', role: 'System Analyst', status: 'Active', joinDate: '2024-04-10', email: 'hamza@example.com', avatar: 'https://i.pravatar.cc/150?u=EMP006' },
  { id: 'EMP007', name: 'Hina Batool', department: 'HR', role: 'Recruiter', status: 'Active', joinDate: '2024-04-25', email: 'hina@example.com', avatar: 'https://i.pravatar.cc/150?u=EMP007' },
  { id: 'EMP008', name: 'Sana Javed', department: 'Finance', role: 'Finance Manager', status: 'Inactive', joinDate: '2024-05-01', email: 'sana@example.com', avatar: 'https://i.pravatar.cc/150?u=EMP008' },
];

export const kpiData = {
  totalEmployees: 245,
  presentToday: 198,
  onLeave: 24,
  newJoiners: 15,
  resignations: 6,
};

export const attendanceData = [
  { date: '01 May', present: 190, absent: 10, onLeave: 5 },
  { date: '02 May', present: 185, absent: 15, onLeave: 5 },
  { date: '03 May', present: 195, absent: 5, onLeave: 5 },
  { date: '04 May', present: 198, absent: 2, onLeave: 5 },
  { date: '05 May', present: 180, absent: 20, onLeave: 5 },
  { date: '06 May', present: 192, absent: 8, onLeave: 5 },
  { date: '07 May', present: 200, absent: 0, onLeave: 5 },
];

export const departmentData = [
  { name: 'IT', count: 85, color: '#4f46e5' },
  { name: 'HR', count: 40, color: '#10b981' },
  { name: 'Finance', count: 45, color: '#f59e0b' },
  { name: 'Marketing', count: 50, color: '#ef4444' },
  { name: 'Operations', count: 25, color: '#8b5cf6' },
];

export const leaveRequests = [
  { id: 1, name: 'Ali Raza', type: 'Annual Leave', from: '2024-05-10', to: '2024-05-12', days: 3, status: 'Approved' },
  { id: 2, name: 'Sara Khan', type: 'Sick Leave', from: '2024-05-15', to: '2024-05-15', days: 1, status: 'Pending' },
  { id: 3, name: 'Usman Ahmed', type: 'Casual Leave', from: '2024-05-20', to: '2024-05-21', days: 2, status: 'Rejected' },
];

export const payrollData = [
  { id: 'EMP001', name: 'Ali Raza', salary: 5000, deductions: 200, netPay: 4800, status: 'Paid' },
  { id: 'EMP002', name: 'Sara Khan', salary: 4500, deductions: 150, netPay: 4350, status: 'Paid' },
  { id: 'EMP003', name: 'Usman Ahmed', salary: 4800, deductions: 180, netPay: 4620, status: 'Unpaid' },
];

export const jobListings = [
  { id: 1, title: 'Senior React Developer', department: 'IT', status: 'Open', applicants: 12 },
  { id: 2, title: 'HR Manager', department: 'HR', status: 'Closed', applicants: 8 },
  { id: 3, title: 'UI/UX Designer', department: 'Design', status: 'Open', applicants: 25 },
];

export const trainingPrograms = [
  { id: 1, title: 'React Hooks Deep Dive', trainer: 'John Doe', status: 'Ongoing', date: '2024-05-20' },
  { id: 2, title: 'Leadership Essentials', trainer: 'Jane Smith', status: 'Upcoming', date: '2024-06-01' },
  { id: 3, title: 'Finance for Non-Finance', trainer: 'Mike Ross', status: 'Completed', date: '2024-04-15' },
];
