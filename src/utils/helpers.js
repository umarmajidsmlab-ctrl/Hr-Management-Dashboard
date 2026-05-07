import { v4 as uuidv4 } from 'uuid';

// Generate a sequential employee ID
export const generateEmployeeId = (employees) => {
  const nums = employees
    .map(e => parseInt(e.id.replace('EMP', ''), 10))
    .filter(n => !isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `EMP${String(next).padStart(3, '0')}`;
};

export const generateId = (prefix = '') => `${prefix}${uuidv4().slice(0, 8).toUpperCase()}`;

// Format date to readable string
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

// Calculate net pay
export const calculateNetPay = (basicSalary, allowances, deductions) =>
  Number(basicSalary) + Number(allowances) - Number(deductions);

// Download CSV from array of objects
export const downloadCSV = (data, filename = 'report.csv') => {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(h => {
        const val = row[h] === null || row[h] === undefined ? '' : row[h];
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      }).join(',')
    )
  ];
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

// Get status badge class
export const getStatusClass = (status) => {
  const map = {
    'Active': 'bg-success-subtle text-success',
    'Inactive': 'bg-danger-subtle text-danger',
    'On Leave': 'bg-warning-subtle text-warning',
    'Approved': 'bg-success-subtle text-success',
    'Pending': 'bg-warning-subtle text-warning',
    'Rejected': 'bg-danger-subtle text-danger',
    'Paid': 'bg-success-subtle text-success',
    'Unpaid': 'bg-danger-subtle text-danger',
    'Open': 'bg-success-subtle text-success',
    'Closed': 'bg-secondary-subtle text-secondary',
    'Ongoing': 'bg-primary-subtle text-primary',
    'Upcoming': 'bg-warning-subtle text-warning',
    'Completed': 'bg-success-subtle text-success',
    'Applied': 'bg-info-subtle text-info',
    'Shortlisted': 'bg-primary-subtle text-primary',
    'Interview Scheduled': 'bg-warning-subtle text-warning',
    'Hired': 'bg-success-subtle text-success',
    'Rejected (Candidate)': 'bg-danger-subtle text-danger',
    'On Time': 'bg-success-subtle text-success',
    'Late': 'bg-warning-subtle text-warning',
    'Early': 'bg-info-subtle text-info',
    'Absent': 'bg-danger-subtle text-danger',
    'Excellent': 'bg-success-subtle text-success',
    'Good': 'bg-primary-subtle text-primary',
    'Average': 'bg-warning-subtle text-warning',
    'Poor': 'bg-danger-subtle text-danger',
  };
  return map[status] || 'bg-secondary-subtle text-secondary';
};

// Get rating label
export const getRatingLabel = (score) => {
  if (score >= 4.5) return 'Excellent';
  if (score >= 3.5) return 'Good';
  if (score >= 2.5) return 'Average';
  return 'Poor';
};

// Truncate text
export const truncate = (str, n = 50) =>
  str && str.length > n ? str.slice(0, n) + '...' : str;
