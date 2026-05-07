import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, DollarSign, Clock, Star } from 'lucide-react';
import { getStatusClass, formatDate, getRatingLabel } from '../utils/helpers';
import StatCard from '../components/UI/StatCard';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');

  const employee = state.employees.find(e => e.id === id);

  if (!employee) {
    return (
      <div className="fade-in text-center py-5">
        <h4>Employee not found</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/employees')}>Back to Employees</button>
      </div>
    );
  }

  // Related data
  const empAttendance = state.attendance.filter(a => a.employeeId === id);
  const empLeaves = state.leaves.filter(l => l.employeeId === id);
  const empPayroll = state.payroll.filter(p => p.employeeId === id);
  const empPerformance = state.performance.filter(p => p.employeeId === id);

  const avgPerfScore = empPerformance.length 
    ? (empPerformance.reduce((acc, p) => acc + p.score, 0) / empPerformance.length).toFixed(1)
    : 'N/A';

  const presentDays = empAttendance.filter(a => a.status === 'On Time' || a.status === 'Late' || a.status === 'Early').length;
  const attendanceRate = empAttendance.length ? Math.round((presentDays / empAttendance.length) * 100) : 0;

  return (
    <div className="fade-in">
      <div className="d-flex align-items-center mb-4 gap-3">
        <button className="btn btn-light rounded-circle p-2" onClick={() => navigate('/employees')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h4 className="fw-bold mb-1">Employee Profile</h4>
          <p className="text-muted small mb-0">Detailed view of employee records.</p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-4">
          <div className="card border-0 p-4 h-100 text-center">
            <img src={employee.avatar} alt={employee.name} className="rounded-circle mx-auto mb-3" width="120" height="120" style={{objectFit: 'cover'}} />
            <h5 className="fw-bold mb-1">{employee.name}</h5>
            <p className="text-muted small mb-2">{employee.role}</p>
            <span className={`badge rounded-pill small fw-normal px-3 py-2 mb-4 d-inline-block ${getStatusClass(employee.status)}`}>
              {employee.status}
            </span>
            <div className="d-flex justify-content-center gap-2 mb-4">
               <button className="btn btn-primary btn-sm px-4">Message</button>
               <button className="btn btn-light btn-sm border px-4" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
            </div>
            <div className="text-start border-top pt-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <Mail size={16} className="text-muted" />
                <span className="small">{employee.email}</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Phone size={16} className="text-muted" />
                <span className="small">{employee.phone || 'N/A'}</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Briefcase size={16} className="text-muted" />
                <span className="small">{employee.department}</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Calendar size={16} className="text-muted" />
                <span className="small">Joined: {formatDate(employee.joinDate)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-lg-8">
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-4">
              <StatCard title="Attendance Rate" value={`${attendanceRate}%`} icon={<Clock size={24} />} color="#4f46e5" />
            </div>
            <div className="col-12 col-md-4">
              <StatCard title="Leaves Taken" value={empLeaves.filter(l=>l.status==='Approved').reduce((s,l)=>s+l.days,0)} icon={<Calendar size={24} />} color="#f59e0b" />
            </div>
            <div className="col-12 col-md-4">
              <StatCard title="Avg Perf Score" value={avgPerfScore} icon={<Star size={24} />} color="#10b981" />
            </div>
          </div>

          <div className="card border-0 overflow-hidden">
            <div className="card-header bg-white border-bottom p-0">
              <ul className="nav nav-tabs border-0 px-4 pt-2">
                {['Overview', 'Attendance', 'Leaves', 'Payroll', 'Performance'].map(tab => (
                  <li className="nav-item" key={tab}>
                    <button 
                      className={`nav-link border-0 border-bottom border-3 py-3 px-4 small fw-bold ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted'}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-body p-4">
              {activeTab === 'Overview' && (
                <div>
                  <h6 className="fw-bold mb-4">Personal Information</h6>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <p className="text-muted x-small mb-1 uppercase">Employee ID</p>
                      <p className="fw-bold small">{employee.id}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="text-muted x-small mb-1 uppercase">Gender</p>
                      <p className="fw-bold small">{employee.gender || 'N/A'}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="text-muted x-small mb-1 uppercase">Birthday</p>
                      <p className="fw-bold small">{formatDate(employee.birthday)}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="text-muted x-small mb-1 uppercase">Basic Salary</p>
                      <p className="fw-bold small">${employee.salary?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Attendance' && (
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead><tr><th>Date</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
                    <tbody>
                      {empAttendance.map(a => (
                        <tr key={a.id}>
                          <td><span className="small">{formatDate(a.date)}</span></td>
                          <td><span className="small">{a.checkIn}</span></td>
                          <td><span className="small">{a.checkOut}</span></td>
                          <td><span className="small">{a.workHours}</span></td>
                          <td><span className={`badge rounded-pill small ${getStatusClass(a.status)}`}>{a.status}</span></td>
                        </tr>
                      ))}
                      {empAttendance.length === 0 && <tr><td colSpan="5" className="text-center py-3 text-muted">No records found</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'Leaves' && (
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th></tr></thead>
                    <tbody>
                      {empLeaves.map(l => (
                        <tr key={l.id}>
                          <td><span className="small">{l.type}</span></td>
                          <td><span className="small">{formatDate(l.from)}</span></td>
                          <td><span className="small">{formatDate(l.to)}</span></td>
                          <td><span className="small">{l.days}</span></td>
                          <td><span className={`badge rounded-pill small ${getStatusClass(l.status)}`}>{l.status}</span></td>
                        </tr>
                      ))}
                      {empLeaves.length === 0 && <tr><td colSpan="5" className="text-center py-3 text-muted">No records found</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'Payroll' && (
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead><tr><th>Month</th><th>Net Pay</th><th>Status</th><th>Processed On</th></tr></thead>
                    <tbody>
                      {empPayroll.map(p => (
                        <tr key={p.id}>
                          <td><span className="small">{p.month}</span></td>
                          <td><span className="small fw-bold">${p.netPay.toLocaleString()}</span></td>
                          <td><span className={`badge rounded-pill small ${getStatusClass(p.status)}`}>{p.status}</span></td>
                          <td><span className="small">{formatDate(p.processedOn)}</span></td>
                        </tr>
                      ))}
                      {empPayroll.length === 0 && <tr><td colSpan="4" className="text-center py-3 text-muted">No records found</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'Performance' && (
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead><tr><th>Period</th><th>Score</th><th>Rating</th><th>Comments</th></tr></thead>
                    <tbody>
                      {empPerformance.map(p => (
                        <tr key={p.id}>
                          <td><span className="small">{p.period}</span></td>
                          <td><span className="small fw-bold text-primary">{p.score}</span></td>
                          <td><span className={`badge rounded-pill small ${getStatusClass(p.rating)}`}>{p.rating}</span></td>
                          <td><span className="small">{p.comments}</span></td>
                        </tr>
                      ))}
                      {empPerformance.length === 0 && <tr><td colSpan="4" className="text-center py-3 text-muted">No records found</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
