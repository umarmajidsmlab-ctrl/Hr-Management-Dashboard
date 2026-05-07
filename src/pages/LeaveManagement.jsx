import React, { useState } from 'react';
import { Calendar, Plus, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getStatusClass, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const LeaveManagement = () => {
  const { state, addLeave, approveLeave, rejectLeave, deleteLeave, confirmAction } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'Pending', 'Approved', 'Rejected'];
  
  const filteredRequests = activeTab === 'All' 
    ? state.leaves 
    : state.leaves.filter(r => r.status === activeTab);

  // Stats
  const total = state.leaves.length;
  const approved = state.leaves.filter(l => l.status === 'Approved').length;
  const pending = state.leaves.filter(l => l.status === 'Pending').length;
  const rejected = state.leaves.filter(l => l.status === 'Rejected').length;

  const [currentLeave, setCurrentLeave] = useState({
    employeeId: '', type: 'Annual Leave', from: '', to: '', days: 1, reason: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentLeave.employeeId || !currentLeave.from || !currentLeave.to) {
      toast.error('Please fill required fields.');
      return;
    }
    const emp = state.employees.find(e => e.id === currentLeave.employeeId);
    addLeave({ ...currentLeave, employeeName: emp?.name || 'Unknown' });
    document.getElementById('closeLeaveModal').click();
  };

  const calculateDays = () => {
    if (currentLeave.from && currentLeave.to) {
      const d1 = new Date(currentLeave.from);
      const d2 = new Date(currentLeave.to);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setCurrentLeave({ ...currentLeave, days: diffDays });
    }
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Leave Management</h4>
          <p className="text-muted small mb-0">Review and approve employee leave requests.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#applyLeaveModal" onClick={() => setCurrentLeave({employeeId: state.employees[0]?.id || '', type: 'Annual Leave', from: '', to: '', days: 1, reason: ''})}>
          <Plus size={18} />
          <span>Apply Leave</span>
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-3">
          <div className="card p-3 d-flex flex-row align-items-center gap-3">
            <div className="bg-primary-subtle p-2 rounded-3 text-primary"><Calendar size={20} /></div>
            <div>
              <p className="text-muted small mb-0">Total Leaves</p>
              <h5 className="fw-bold mb-0">{total}</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card p-3 d-flex flex-row align-items-center gap-3">
            <div className="bg-success-subtle p-2 rounded-3 text-success"><CheckCircle size={20} /></div>
            <div>
              <p className="text-muted small mb-0">Approved</p>
              <h5 className="fw-bold mb-0">{approved}</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card p-3 d-flex flex-row align-items-center gap-3">
            <div className="bg-warning-subtle p-2 rounded-3 text-warning"><Clock size={20} /></div>
            <div>
              <p className="text-muted small mb-0">Pending</p>
              <h5 className="fw-bold mb-0">{pending}</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card p-3 d-flex flex-row align-items-center gap-3">
            <div className="bg-danger-subtle p-2 rounded-3 text-danger"><XCircle size={20} /></div>
            <div>
              <p className="text-muted small mb-0">Rejected</p>
              <h5 className="fw-bold mb-0">{rejected}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 overflow-hidden">
        <div className="card-header bg-white border-bottom p-0">
          <ul className="nav nav-tabs border-0 px-4 pt-2">
            {tabs.map(tab => (
              <li className="nav-item" key={tab}>
                <button 
                  className={`nav-link border-0 border-bottom border-3 py-3 px-4 small fw-bold ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} Leaves
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th className="ps-4">Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Status</th>
                <th className="pe-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td className="ps-4">
                    <p className="mb-0 fw-bold small">{req.employeeName}</p>
                    <p className="mb-0 text-muted x-small">{req.employeeId}</p>
                  </td>
                  <td><span className="small">{req.type}</span></td>
                  <td><span className="small">{formatDate(req.from)}</span></td>
                  <td><span className="small">{formatDate(req.to)}</span></td>
                  <td><span className="small">{req.days}</span></td>
                  <td>
                    <span className={`badge rounded-pill small fw-normal px-3 py-2 ${getStatusClass(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="pe-4 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      {req.status === 'Pending' && (
                        <>
                          <button className="btn btn-light btn-sm rounded-3 border" title="Approve" onClick={() => approveLeave(req.id, req.employeeName)}><CheckCircle size={14} className="text-success" /></button>
                          <button className="btn btn-light btn-sm rounded-3 border" title="Reject" onClick={() => rejectLeave(req.id, req.employeeName)}><XCircle size={14} className="text-danger" /></button>
                        </>
                      )}
                      <button className="btn btn-light btn-sm rounded-3 border" title="Delete" onClick={() => { 
                        confirmAction({
                          title: 'Delete Leave Request',
                          message: 'Are you sure you want to delete this leave request?',
                          onConfirm: () => deleteLeave(req.id),
                          type: 'danger'
                        });
                      }}><Trash2 size={14} className="text-muted" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr><td colSpan="7" className="text-center py-4 text-muted">No leave requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Apply Leave Modal */}
      <div className="modal fade" id="applyLeaveModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Apply for Leave</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeLeaveModal"></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Employee *</label>
                    <select className="form-select" value={currentLeave.employeeId} onChange={(e) => setCurrentLeave({...currentLeave, employeeId: e.target.value})} required>
                      <option value="">Select Employee</option>
                      {state.employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Leave Type</label>
                    <select className="form-select" value={currentLeave.type} onChange={(e) => setCurrentLeave({...currentLeave, type: e.target.value})}>
                      <option>Annual Leave</option>
                      <option>Sick Leave</option>
                      <option>Casual Leave</option>
                      <option>Maternity/Paternity Leave</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">From Date</label>
                    <input type="date" className="form-control" value={currentLeave.from} onChange={(e) => setCurrentLeave({...currentLeave, from: e.target.value})} onBlur={calculateDays} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">To Date</label>
                    <input type="date" className="form-control" value={currentLeave.to} onChange={(e) => setCurrentLeave({...currentLeave, to: e.target.value})} onBlur={calculateDays} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Days</label>
                    <input type="number" className="form-control bg-light" value={currentLeave.days} readOnly />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Reason</label>
                    <textarea className="form-control" rows="3" placeholder="Brief explanation..." value={currentLeave.reason} onChange={(e) => setCurrentLeave({...currentLeave, reason: e.target.value})}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
