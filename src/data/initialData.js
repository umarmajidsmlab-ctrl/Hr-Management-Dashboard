export const initialEmployees = [
  { id: 'EMP001', name: 'Ali Raza', department: 'IT', role: 'Software Engineer', status: 'Active', joinDate: '2024-01-15', email: 'ali.raza@hrmsuite.com', phone: '+92-300-1234567', salary: 85000, gender: 'Male', birthday: '1992-03-15', avatar: 'https://i.pravatar.cc/150?u=EMP001' },
  { id: 'EMP002', name: 'Sara Khan', department: 'HR', role: 'HR Executive', status: 'Active', joinDate: '2024-02-10', email: 'sara.khan@hrmsuite.com', phone: '+92-300-2345678', salary: 75000, gender: 'Female', birthday: '1994-05-22', avatar: 'https://i.pravatar.cc/150?u=EMP002' },
  { id: 'EMP003', name: 'Usman Ahmed', department: 'Finance', role: 'Accountant', status: 'Active', joinDate: '2024-03-05', email: 'usman.ahmed@hrmsuite.com', phone: '+92-300-3456789', salary: 80000, gender: 'Male', birthday: '1990-08-10', avatar: 'https://i.pravatar.cc/150?u=EMP003' },
  { id: 'EMP004', name: 'Ayesha Malik', department: 'Marketing', role: 'Marketing Executive', status: 'Active', joinDate: '2024-03-20', email: 'ayesha.malik@hrmsuite.com', phone: '+92-300-4567890', salary: 70000, gender: 'Female', birthday: '1995-11-30', avatar: 'https://i.pravatar.cc/150?u=EMP004' },
  { id: 'EMP005', name: 'Bilal Hussain', department: 'Design', role: 'UI/UX Designer', status: 'On Leave', joinDate: '2024-04-01', email: 'bilal.hussain@hrmsuite.com', phone: '+92-300-5678901', salary: 78000, gender: 'Male', birthday: '1993-07-18', avatar: 'https://i.pravatar.cc/150?u=EMP005' },
  { id: 'EMP006', name: 'Hamza Ali', department: 'IT', role: 'System Analyst', status: 'Active', joinDate: '2024-04-10', email: 'hamza.ali@hrmsuite.com', phone: '+92-300-6789012', salary: 90000, gender: 'Male', birthday: '1991-01-25', avatar: 'https://i.pravatar.cc/150?u=EMP006' },
  { id: 'EMP007', name: 'Hina Batool', department: 'HR', role: 'Recruiter', status: 'Active', joinDate: '2024-04-25', email: 'hina.batool@hrmsuite.com', phone: '+92-300-7890123', salary: 65000, gender: 'Female', birthday: '1996-09-05', avatar: 'https://i.pravatar.cc/150?u=EMP007' },
  { id: 'EMP008', name: 'Sana Javed', department: 'Finance', role: 'Finance Manager', status: 'Inactive', joinDate: '2024-05-01', email: 'sana.javed@hrmsuite.com', phone: '+92-300-8901234', salary: 95000, gender: 'Female', birthday: '1988-12-12', avatar: 'https://i.pravatar.cc/150?u=EMP008' },
  { id: 'EMP009', name: 'Kamran Sheikh', department: 'Operations', role: 'Operations Manager', status: 'Active', joinDate: '2024-05-10', email: 'kamran.sheikh@hrmsuite.com', phone: '+92-300-9012345', salary: 100000, gender: 'Male', birthday: '1987-04-20', avatar: 'https://i.pravatar.cc/150?u=EMP009' },
  { id: 'EMP010', name: 'Zainab Noor', department: 'IT', role: 'QA Engineer', status: 'Active', joinDate: '2024-05-15', email: 'zainab.noor@hrmsuite.com', phone: '+92-300-0123456', salary: 72000, gender: 'Female', birthday: '1997-02-28', avatar: 'https://i.pravatar.cc/150?u=EMP010' },
  { id: 'EMP011', name: 'Asad Mehmood', department: 'Marketing', role: 'Content Writer', status: 'Active', joinDate: '2024-06-01', email: 'asad.mehmood@hrmsuite.com', phone: '+92-301-1234567', salary: 55000, gender: 'Male', birthday: '1999-06-15', avatar: 'https://i.pravatar.cc/150?u=EMP011' },
  { id: 'EMP012', name: 'Fatima Zahra', department: 'Design', role: 'Graphic Designer', status: 'Active', joinDate: '2024-06-10', email: 'fatima.zahra@hrmsuite.com', phone: '+92-301-2345678', salary: 60000, gender: 'Female', birthday: '1998-10-03', avatar: 'https://i.pravatar.cc/150?u=EMP012' },
];

export const initialAttendance = [
  { id: 'ATT001', employeeId: 'EMP001', employeeName: 'Ali Raza', date: '2024-05-07', checkIn: '09:05 AM', checkOut: '06:15 PM', workHours: '9h 10m', status: 'On Time' },
  { id: 'ATT002', employeeId: 'EMP002', employeeName: 'Sara Khan', date: '2024-05-07', checkIn: '09:30 AM', checkOut: '06:00 PM', workHours: '8h 30m', status: 'Late' },
  { id: 'ATT003', employeeId: 'EMP003', employeeName: 'Usman Ahmed', date: '2024-05-07', checkIn: '08:55 AM', checkOut: '05:55 PM', workHours: '9h 00m', status: 'On Time' },
  { id: 'ATT004', employeeId: 'EMP004', employeeName: 'Ayesha Malik', date: '2024-05-07', checkIn: '10:00 AM', checkOut: '06:00 PM', workHours: '8h 00m', status: 'Late' },
  { id: 'ATT005', employeeId: 'EMP006', employeeName: 'Hamza Ali', date: '2024-05-07', checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '9h 00m', status: 'On Time' },
  { id: 'ATT006', employeeId: 'EMP007', employeeName: 'Hina Batool', date: '2024-05-07', checkIn: '09:10 AM', checkOut: '06:10 PM', workHours: '9h 00m', status: 'On Time' },
  { id: 'ATT007', employeeId: 'EMP009', employeeName: 'Kamran Sheikh', date: '2024-05-07', checkIn: '08:45 AM', checkOut: '05:45 PM', workHours: '9h 00m', status: 'Early' },
  { id: 'ATT008', employeeId: 'EMP010', employeeName: 'Zainab Noor', date: '2024-05-07', checkIn: '09:05 AM', checkOut: '06:05 PM', workHours: '9h 00m', status: 'On Time' },
];

export const initialLeaves = [
  { id: 'LVE001', employeeId: 'EMP001', employeeName: 'Ali Raza', type: 'Annual Leave', from: '2024-05-10', to: '2024-05-12', days: 3, reason: 'Family vacation', status: 'Approved', appliedOn: '2024-05-01' },
  { id: 'LVE002', employeeId: 'EMP002', employeeName: 'Sara Khan', type: 'Sick Leave', from: '2024-05-15', to: '2024-05-15', days: 1, reason: 'Medical appointment', status: 'Pending', appliedOn: '2024-05-10' },
  { id: 'LVE003', employeeId: 'EMP003', employeeName: 'Usman Ahmed', type: 'Casual Leave', from: '2024-05-20', to: '2024-05-21', days: 2, reason: 'Personal work', status: 'Rejected', appliedOn: '2024-05-12' },
  { id: 'LVE004', employeeId: 'EMP005', employeeName: 'Bilal Hussain', type: 'Annual Leave', from: '2024-05-01', to: '2024-05-07', days: 7, reason: 'Vacation', status: 'Approved', appliedOn: '2024-04-25' },
  { id: 'LVE005', employeeId: 'EMP007', employeeName: 'Hina Batool', type: 'Casual Leave', from: '2024-05-22', to: '2024-05-22', days: 1, reason: 'Personal errand', status: 'Pending', appliedOn: '2024-05-15' },
];

export const initialPayroll = [
  { id: 'PAY001', employeeId: 'EMP001', employeeName: 'Ali Raza', department: 'IT', basicSalary: 85000, allowances: 5000, deductions: 3200, netPay: 86800, month: 'May 2024', status: 'Paid', processedOn: '2024-05-01' },
  { id: 'PAY002', employeeId: 'EMP002', employeeName: 'Sara Khan', department: 'HR', basicSalary: 75000, allowances: 4000, deductions: 2800, netPay: 76200, month: 'May 2024', status: 'Paid', processedOn: '2024-05-01' },
  { id: 'PAY003', employeeId: 'EMP003', employeeName: 'Usman Ahmed', department: 'Finance', basicSalary: 80000, allowances: 4500, deductions: 3000, netPay: 81500, month: 'May 2024', status: 'Unpaid', processedOn: null },
  { id: 'PAY004', employeeId: 'EMP006', employeeName: 'Hamza Ali', department: 'IT', basicSalary: 90000, allowances: 6000, deductions: 3500, netPay: 92500, month: 'May 2024', status: 'Unpaid', processedOn: null },
  { id: 'PAY005', employeeId: 'EMP009', employeeName: 'Kamran Sheikh', department: 'Operations', basicSalary: 100000, allowances: 8000, deductions: 4000, netPay: 104000, month: 'May 2024', status: 'Paid', processedOn: '2024-05-01' },
];

export const initialJobs = [
  { id: 'JOB001', title: 'Senior React Developer', department: 'IT', location: 'Karachi', type: 'Full-time', status: 'Open', applicants: 12, postedOn: '2024-04-15', description: 'Looking for an experienced React developer to join our growing IT team.' },
  { id: 'JOB002', title: 'HR Manager', department: 'HR', location: 'Lahore', type: 'Full-time', status: 'Closed', applicants: 8, postedOn: '2024-03-01', description: 'Seeking a skilled HR Manager to lead our human resources operations.' },
  { id: 'JOB003', title: 'UI/UX Designer', department: 'Design', location: 'Islamabad', type: 'Full-time', status: 'Open', applicants: 25, postedOn: '2024-04-20', description: 'Creative designer needed to craft beautiful and intuitive user interfaces.' },
  { id: 'JOB004', title: 'Financial Analyst', department: 'Finance', location: 'Karachi', type: 'Contract', status: 'Open', applicants: 6, postedOn: '2024-05-01', description: 'Analytical professional required for financial planning and reporting.' },
];

export const initialCandidates = [
  { id: 'CND001', name: 'Raza Ahmad', jobId: 'JOB001', email: 'raza@gmail.com', phone: '+92-300-1111111', status: 'Interview Scheduled', appliedOn: '2024-04-18', avatar: 'https://i.pravatar.cc/150?u=CND001' },
  { id: 'CND002', name: 'Maria Hassan', jobId: 'JOB001', email: 'maria@gmail.com', phone: '+92-300-2222222', status: 'Shortlisted', appliedOn: '2024-04-20', avatar: 'https://i.pravatar.cc/150?u=CND002' },
  { id: 'CND003', name: 'Tariq Mahmood', jobId: 'JOB003', email: 'tariq@gmail.com', phone: '+92-300-3333333', status: 'Applied', appliedOn: '2024-04-22', avatar: 'https://i.pravatar.cc/150?u=CND003' },
  { id: 'CND004', name: 'Nadia Siddiqui', jobId: 'JOB003', email: 'nadia@gmail.com', phone: '+92-300-4444444', status: 'Hired', appliedOn: '2024-04-23', avatar: 'https://i.pravatar.cc/150?u=CND004' },
  { id: 'CND005', name: 'Imran Khan', jobId: 'JOB004', email: 'imran@gmail.com', phone: '+92-300-5555555', status: 'Applied', appliedOn: '2024-05-02', avatar: 'https://i.pravatar.cc/150?u=CND005' },
];

export const initialPerformance = [
  { id: 'PRF001', employeeId: 'EMP001', employeeName: 'Ali Raza', period: 'Q1 2024', score: 4.8, rating: 'Excellent', comments: 'Outstanding performance, delivered all projects on time.', reviewedBy: 'Admin', reviewedOn: '2024-04-01' },
  { id: 'PRF002', employeeId: 'EMP002', employeeName: 'Sara Khan', period: 'Q1 2024', score: 4.5, rating: 'Excellent', comments: 'Great team player, excellent HR operations management.', reviewedBy: 'Admin', reviewedOn: '2024-04-01' },
  { id: 'PRF003', employeeId: 'EMP003', employeeName: 'Usman Ahmed', period: 'Q1 2024', score: 3.9, rating: 'Good', comments: 'Solid performance, needs improvement in reporting speed.', reviewedBy: 'Admin', reviewedOn: '2024-04-01' },
  { id: 'PRF004', employeeId: 'EMP006', employeeName: 'Hamza Ali', period: 'Q1 2024', score: 4.2, rating: 'Good', comments: 'Excellent technical skills, good problem solver.', reviewedBy: 'Admin', reviewedOn: '2024-04-01' },
  { id: 'PRF005', employeeId: 'EMP009', employeeName: 'Kamran Sheikh', period: 'Q1 2024', score: 4.6, rating: 'Excellent', comments: 'Exceptional leadership and operations management.', reviewedBy: 'Admin', reviewedOn: '2024-04-01' },
];

export const initialTraining = [
  { id: 'TRN001', title: 'React Hooks Deep Dive', trainer: 'John Doe', department: 'IT', status: 'Ongoing', startDate: '2024-05-01', endDate: '2024-05-20', enrolledEmployees: ['EMP001', 'EMP006', 'EMP010'], description: 'Advanced React hooks patterns and best practices.' },
  { id: 'TRN002', title: 'Leadership Essentials', trainer: 'Jane Smith', department: 'All', status: 'Upcoming', startDate: '2024-06-01', endDate: '2024-06-05', enrolledEmployees: ['EMP002', 'EMP009'], description: 'Core leadership skills for managers and team leads.' },
  { id: 'TRN003', title: 'Finance for Non-Finance', trainer: 'Mike Ross', department: 'All', status: 'Completed', startDate: '2024-04-01', endDate: '2024-04-15', enrolledEmployees: ['EMP001', 'EMP002', 'EMP004', 'EMP007'], description: 'Understanding financial statements and budgeting.' },
  { id: 'TRN004', title: 'UX Research Fundamentals', trainer: 'Sarah Lee', department: 'Design', status: 'Upcoming', startDate: '2024-06-10', endDate: '2024-06-15', enrolledEmployees: ['EMP005', 'EMP012'], description: 'User research methods and usability testing.' },
];

export const initialNotifications = [
  { id: 'NTF001', type: 'info', message: 'New employee Ali Raza has been added.', time: '2024-05-07 09:00', read: false },
  { id: 'NTF002', type: 'warning', message: 'Leave request from Sara Khan is pending approval.', time: '2024-05-07 10:30', read: false },
  { id: 'NTF003', type: 'success', message: 'Payroll for May 2024 has been processed.', time: '2024-05-07 11:00', read: true },
  { id: 'NTF004', type: 'info', message: 'New job application received for Senior React Developer.', time: '2024-05-07 12:00', read: true },
];

export const initialMessages = [
  { id: 'MSG001', sender: 'Sara Khan', avatar: 'https://i.pravatar.cc/150?u=EMP002', message: 'Hi Admin, can you review my leave request?', time: '10:30 AM', isAdmin: false },
  { id: 'MSG002', sender: 'Admin', avatar: 'https://i.pravatar.cc/150?u=admin', message: 'Sure Sara, I will review it shortly.', time: '10:32 AM', isAdmin: true },
  { id: 'MSG003', sender: 'Hamza Ali', avatar: 'https://i.pravatar.cc/150?u=EMP006', message: 'The server deployment is complete.', time: '11:00 AM', isAdmin: false },
  { id: 'MSG004', sender: 'Admin', avatar: 'https://i.pravatar.cc/150?u=admin', message: 'Great work Hamza! Good job.', time: '11:05 AM', isAdmin: true },
];

export const initialAttendanceTrend = [
  { date: '01 May', present: 190, absent: 10, onLeave: 5 },
  { date: '02 May', present: 185, absent: 15, onLeave: 5 },
  { date: '03 May', present: 195, absent: 5, onLeave: 5 },
  { date: '04 May', present: 198, absent: 2, onLeave: 5 },
  { date: '05 May', present: 180, absent: 20, onLeave: 5 },
  { date: '06 May', present: 192, absent: 8, onLeave: 5 },
  { date: '07 May', present: 200, absent: 0, onLeave: 5 },
];

export const adminProfile = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@hrmsuite.com',
  phone: '+92-300-0000000',
  designation: 'HR Manager',
  department: 'HR',
  avatar: 'https://i.pravatar.cc/150?u=admin',
  joinDate: '2023-01-01',
};
