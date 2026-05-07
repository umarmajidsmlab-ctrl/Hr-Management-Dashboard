import React, { useState } from 'react';
import { FileText, Download, Filter, BarChart2, PieChart, Users, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadCSV } from '../utils/helpers';
import toast from 'react-hot-toast';

const Reports = () => {
  const { state } = useApp();
  const [reportType, setReportType] = useState('employees');
  const [dateRange, setDateRange] = useState('This Month');

  const generateReport = () => {
    let data = [];
    let filename = '';

    switch (reportType) {
      case 'employees':
        data = state.employees.map(({ id, name, department, role, status, joinDate }) => ({ id, name, department, role, status, joinDate }));
        filename = 'employees_report.csv';
        break;
      case 'attendance':
        data = state.attendance.map(({ employeeName, date, checkIn, checkOut, status }) => ({ employeeName, date, checkIn, checkOut, status }));
        filename = 'attendance_report.csv';
        break;
      case 'payroll':
        data = state.payroll.map(({ employeeName, month, basicSalary, netPay, status }) => ({ employeeName, month, basicSalary, netPay, status }));
        filename = 'payroll_report.csv';
        break;
      case 'recruitment':
        data = state.jobs.map(({ title, department, applicants, status }) => ({ title, department, applicants, status }));
        filename = 'recruitment_report.csv';
        break;
      default:
        return;
    }

    if (data.length === 0) {
      toast.error('No data available for this report.');
      return;
    }

    downloadCSV(data, filename);
    toast.success('Report generated and downloaded!');
  };

  const reportsList = [
    { id: 'employees', title: 'Employee Directory', desc: 'List of all active and inactive employees.', icon: <Users size={20} className="text-primary" /> },
    { id: 'attendance', title: 'Attendance Logs', desc: 'Daily attendance records and timesheets.', icon: <FileText size={20} className="text-success" /> },
    { id: 'payroll', title: 'Payroll Summary', desc: 'Salary processing and tax deductions.', icon: <DollarSign size={20} className="text-warning" /> },
    { id: 'recruitment', title: 'Recruitment Funnel', desc: 'Job openings and applicant tracking.', icon: <BarChart2 size={20} className="text-info" /> },
    { id: 'performance', title: 'Performance Reviews', desc: 'Employee appraisal scores and ratings.', icon: <PieChart size={20} className="text-danger" /> },
  ];

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Reports</h4>
          <p className="text-muted small mb-0">Generate and export organizational data.</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card border-0 p-4 h-100">
            <h6 className="fw-bold mb-4">Generate Report</h6>
            
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Select Report Type</label>
              <select className="form-select bg-light border-0" value={reportType} onChange={e => setReportType(e.target.value)}>
                <option value="employees">Employee Directory</option>
                <option value="attendance">Attendance Logs</option>
                <option value="payroll">Payroll Summary</option>
                <option value="recruitment">Recruitment Data</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Date Range</label>
              <select className="form-select bg-light border-0" value={dateRange} onChange={e => setDateRange(e.target.value)}>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last Quarter</option>
                <option>Year to Date</option>
                <option>Custom Range...</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Format</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="format" id="csv" defaultChecked />
                  <label className="form-check-label small" htmlFor="csv">CSV (Excel)</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="format" id="pdf" disabled />
                  <label className="form-check-label small text-muted" htmlFor="pdf">PDF (Pro)</label>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 mt-auto" onClick={generateReport}>
              <Download size={18} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card border-0 p-0 overflow-hidden h-100">
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">Available Reports</h6>
              <button className="btn btn-light btn-sm border d-flex align-items-center gap-2">
                <Filter size={14} /> Filter
              </button>
            </div>
            <div className="list-group list-group-flush">
              {reportsList.map((rep) => (
                <div key={rep.id} className="list-group-item p-4 border-0 border-bottom d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-light p-3 rounded-circle">
                      {rep.icon}
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">{rep.title}</h6>
                      <p className="text-muted small mb-0">{rep.desc}</p>
                    </div>
                  </div>
                  <button className="btn btn-outline-primary btn-sm px-3" onClick={() => { setReportType(rep.id); }}>
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
