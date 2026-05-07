import React, { useState } from 'react';
import { Calendar, Clock, UserCheck, UserX, MoreVertical, Search, FileDown } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import { useApp } from '../context/AppContext';
import { Bar } from 'react-chartjs-2';
import { getStatusClass, formatDate, downloadCSV } from '../utils/helpers';
import toast from 'react-hot-toast';

const Attendance = () => {
  const { state, addAttendance, updateAttendance, deleteAttendance, confirmAction } = useApp();
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  // Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [currentAtt, setCurrentAtt] = useState({
    employeeId: '', date: new Date().toISOString().split('T')[0], checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '9h 00m', status: 'On Time'
  });

  const filteredAttendance = state.attendance.filter(a => a.date === filterDate);

  const barChartData = {
    labels: state.attendanceTrend.map(d => d.date),
    datasets: [
      {
        label: 'Present',
        data: state.attendanceTrend.map(d => d.present),
        backgroundColor: '#4f46e5',
        borderRadius: 4,
      },
      {
        label: 'Absent',
        data: state.attendanceTrend.map(d => d.absent),
        backgroundColor: '#ef4444',
        borderRadius: 4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { usePointStyle: true, padding: 20 }
      }
    },
    scales: {
      y: { grid: { borderDash: [5, 5], drawBorder: false } },
      x: { grid: { display: false } }
    }
  };

  const handleExport = () => {
    downloadCSV(filteredAttendance, `attendance_${filterDate}.csv`);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentAtt({ employeeId: state.employees[0]?.id || '', date: filterDate, checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '9h 00m', status: 'On Time' });
  };

  const openEditModal = (att) => {
    setIsEditing(true);
    setCurrentAtt(att);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentAtt.employeeId) {
      toast.error('Select an employee');
      return;
    }
    const emp = state.employees.find(e => e.id === currentAtt.employeeId);
    const dataToSave = { ...currentAtt, employeeName: emp ? emp.name : 'Unknown' };
    
    if (isEditing) {
      updateAttendance(dataToSave);
    } else {
      addAttendance(dataToSave);
    }
    document.getElementById('closeAttModal').click();
  };

  const handleDelete = (id) => {
    confirmAction({
      title: 'Delete Attendance',
      message: 'Are you sure you want to delete this attendance record?',
      onConfirm: () => deleteAttendance(id),
      type: 'danger'
    });
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Attendance</h4>
          <p className="text-muted small mb-0">Track employee presence and punctuality.</p>
        </div>
        <div className="d-flex gap-2">
          <input type="date" className="form-control form-control-sm" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
          <button className="btn btn-primary btn-sm px-3" data-bs-toggle="modal" data-bs-target="#attModal" onClick={openAddModal}>Mark Attendance</button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <StatCard title="Avg. Attendance" value="94.5%" icon={<Calendar size={24} />} color="#4f46e5" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard title="Early Leavers" value="12" icon={<Clock size={24} />} color="#f59e0b" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard title="Late Arrivals" value="8" icon={<UserX size={24} />} color="#ef4444" />
        </div>
      </div>

      <div className="card border-0 p-4 mb-4">
        <h6 className="fw-bold mb-4">Weekly Attendance Trend</h6>
        <div style={{ height: '300px' }}>
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      <div className="card border-0 p-0 overflow-hidden">
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0">Records for {formatDate(filterDate)}</h6>
          <button className="btn btn-light btn-sm d-flex align-items-center gap-2 border" onClick={handleExport}>
            <FileDown size={14} /> Download Logs
          </button>
        </div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th className="ps-4">Employee</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Work Hours</th>
                <th>Status</th>
                <th className="pe-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((att) => {
                const emp = state.employees.find(e => e.id === att.employeeId);
                return (
                  <tr key={att.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        {emp ? <img src={emp.avatar} alt={emp.name} className="rounded-circle me-3" width="36" height="36" style={{objectFit:'cover'}} /> : <div className="bg-light rounded-circle me-3" style={{width: 36, height: 36}}></div>}
                        <div>
                          <p className="mb-0 fw-bold small">{att.employeeName}</p>
                          <p className="mb-0 text-muted x-small">{att.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="small">{att.checkIn}</span></td>
                    <td><span className="small">{att.checkOut}</span></td>
                    <td><span className="small">{att.workHours}</span></td>
                    <td>
                      <span className={`badge rounded-pill small fw-normal px-3 py-2 ${getStatusClass(att.status)}`}>
                        {att.status}
                      </span>
                    </td>
                    <td className="pe-4 text-end">
                      <div className="dropdown">
                        <button className="btn btn-light btn-sm rounded-circle p-1" data-bs-toggle="dropdown">
                          <MoreVertical size={16} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                          <li><button className="dropdown-item py-2 small" data-bs-toggle="modal" data-bs-target="#attModal" onClick={() => openEditModal(att)}>Edit</button></li>
                          <li><button className="dropdown-item py-2 small text-danger" onClick={() => handleDelete(att.id)}>Delete</button></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredAttendance.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">No attendance records for this date.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="attModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">{isEditing ? 'Edit Attendance' : 'Mark Attendance'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeAttModal"></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Employee *</label>
                    <select className="form-select" value={currentAtt.employeeId} onChange={(e) => setCurrentAtt({...currentAtt, employeeId: e.target.value})} disabled={isEditing} required>
                      <option value="">Select Employee</option>
                      {state.employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Check In</label>
                    <input type="text" className="form-control" value={currentAtt.checkIn} onChange={(e) => setCurrentAtt({...currentAtt, checkIn: e.target.value})} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Check Out</label>
                    <input type="text" className="form-control" value={currentAtt.checkOut} onChange={(e) => setCurrentAtt({...currentAtt, checkOut: e.target.value})} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Work Hours</label>
                    <input type="text" className="form-control" value={currentAtt.workHours} onChange={(e) => setCurrentAtt({...currentAtt, workHours: e.target.value})} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Status</label>
                    <select className="form-select" value={currentAtt.status} onChange={(e) => setCurrentAtt({...currentAtt, status: e.target.value})}>
                      <option>On Time</option>
                      <option>Late</option>
                      <option>Early</option>
                      <option>Absent</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
