import React, { useState } from 'react';
import { CreditCard, DollarSign, PieChart, Download, MoreVertical, Clock, Edit2, Trash2, CheckCircle } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import { useApp } from '../context/AppContext';
import { getStatusClass, formatDate, downloadCSV, calculateNetPay } from '../utils/helpers';
import toast from 'react-hot-toast';

const Payroll = () => {
  const { state, addPayroll, updatePayroll, deletePayroll, markPaid, confirmAction } = useApp();
  
  const [filterMonth, setFilterMonth] = useState('May 2024');

  const filteredPayroll = state.payroll.filter(p => p.month === filterMonth);

  const totalPayroll = filteredPayroll.reduce((acc, p) => acc + p.netPay, 0);
  const paidCount = filteredPayroll.filter(p => p.status === 'Paid').length;
  const pendingCount = filteredPayroll.filter(p => p.status === 'Unpaid').length;
  const taxDeductions = filteredPayroll.reduce((acc, p) => acc + p.deductions, 0);

  // Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [currentPay, setCurrentPay] = useState({
    employeeId: '', month: 'May 2024', basicSalary: 0, allowances: 0, deductions: 0, status: 'Unpaid'
  });

  const handleExport = () => {
    downloadCSV(filteredPayroll, `payroll_${filterMonth.replace(' ', '_')}.csv`);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentPay({ employeeId: state.employees[0]?.id || '', month: filterMonth, basicSalary: 50000, allowances: 0, deductions: 0, status: 'Unpaid' });
  };

  const openEditModal = (pay) => {
    setIsEditing(true);
    setCurrentPay(pay);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentPay.employeeId) {
      toast.error('Select an employee');
      return;
    }
    const emp = state.employees.find(e => e.id === currentPay.employeeId);
    const net = calculateNetPay(currentPay.basicSalary, currentPay.allowances, currentPay.deductions);
    const dataToSave = { 
      ...currentPay, 
      employeeName: emp ? emp.name : 'Unknown',
      department: emp ? emp.department : 'Unknown',
      basicSalary: Number(currentPay.basicSalary),
      allowances: Number(currentPay.allowances),
      deductions: Number(currentPay.deductions),
      netPay: net,
      processedOn: currentPay.status === 'Paid' ? (currentPay.processedOn || new Date().toISOString().split('T')[0]) : null
    };

    if (isEditing) {
      updatePayroll(dataToSave);
    } else {
      addPayroll(dataToSave);
    }
    document.getElementById('closePayrollModal').click();
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Payroll</h4>
          <p className="text-muted small mb-0">Manage employee salaries and disbursements.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#payrollModal" onClick={openAddModal}>
          <DollarSign size={18} />
          <span>Process Payroll</span>
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-3">
          <StatCard title="Total Monthly Payroll" value={`$${totalPayroll.toLocaleString()}`} icon={<DollarSign size={24} />} color="#4f46e5" />
        </div>
        <div className="col-12 col-md-3">
          <StatCard title="Employees Paid" value={paidCount} icon={<CreditCard size={24} />} trend={`${filteredPayroll.length > 0 ? Math.round((paidCount/filteredPayroll.length)*100) : 0}%`} color="#10b981" />
        </div>
        <div className="col-12 col-md-3">
          <StatCard title="Tax Deductions" value={`$${taxDeductions.toLocaleString()}`} icon={<PieChart size={24} />} color="#f59e0b" />
        </div>
        <div className="col-12 col-md-3">
          <StatCard title="Pending Payments" value={pendingCount} icon={<Clock size={24} />} color="#ef4444" />
        </div>
      </div>

      <div className="card border-0 p-0">
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0">Salary Records - {filterMonth}</h6>
          <div className="d-flex gap-2">
            <select className="form-select form-select-sm" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
              <option>May 2024</option>
              <option>June 2024</option>
              <option>July 2024</option>
            </select>
            <button className="btn btn-light btn-sm border d-flex align-items-center gap-2" onClick={handleExport}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th className="ps-4">Employee</th>
                <th>Basic Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th>Status</th>
                <th className="pe-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayroll.map((record) => (
                <tr key={record.id}>
                  <td className="ps-4">
                    <p className="mb-0 fw-bold small">{record.employeeName}</p>
                    <p className="mb-0 text-muted x-small">{record.employeeId}</p>
                  </td>
                  <td><span className="small">${record.basicSalary.toLocaleString()}</span></td>
                  <td><span className="small">${record.allowances.toLocaleString()}</span></td>
                  <td><span className="small text-danger">-${record.deductions.toLocaleString()}</span></td>
                  <td><span className="small fw-bold">${record.netPay.toLocaleString()}</span></td>
                  <td>
                    <span className={`badge rounded-pill small fw-normal px-3 py-2 ${getStatusClass(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="pe-4 text-end">
                    <div className="dropdown">
                      <button className="btn btn-light btn-sm rounded-circle p-1" data-bs-toggle="dropdown">
                        <MoreVertical size={16} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                        {record.status === 'Unpaid' && (
                          <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2" onClick={() => markPaid(record.id)}><CheckCircle size={14} className="text-success" /> Mark Paid</button></li>
                        )}
                        <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#payrollModal" onClick={() => openEditModal(record)}><Edit2 size={14} /> Edit</button></li>
                        <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2 text-danger" onClick={() => { 
                          confirmAction({
                            title: 'Delete Payroll Record',
                            message: 'Are you sure you want to delete this payroll record?',
                            onConfirm: () => deletePayroll(record.id),
                            type: 'danger'
                          });
                        }}><Trash2 size={14} /> Delete</button></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPayroll.length === 0 && (
                <tr><td colSpan="7" className="text-center py-4 text-muted">No payroll records for this month.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="payrollModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">{isEditing ? 'Edit Payroll Record' : 'Add Payroll Record'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closePayrollModal"></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Employee *</label>
                    <select className="form-select" value={currentPay.employeeId} onChange={(e) => {
                      const id = e.target.value;
                      const emp = state.employees.find(x => x.id === id);
                      setCurrentPay({...currentPay, employeeId: id, basicSalary: emp ? emp.salary : 0});
                    }} disabled={isEditing} required>
                      <option value="">Select Employee</option>
                      {state.employees.map(e => <option key={e.id} value={e.id}>{e.name} (Base: ${e.salary})</option>)}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Month</label>
                    <input type="text" className="form-control" value={currentPay.month} onChange={(e) => setCurrentPay({...currentPay, month: e.target.value})} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Basic Salary</label>
                    <input type="number" className="form-control" value={currentPay.basicSalary} onChange={(e) => setCurrentPay({...currentPay, basicSalary: e.target.value})} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Allowances</label>
                    <input type="number" className="form-control" value={currentPay.allowances} onChange={(e) => setCurrentPay({...currentPay, allowances: e.target.value})} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Deductions</label>
                    <input type="number" className="form-control" value={currentPay.deductions} onChange={(e) => setCurrentPay({...currentPay, deductions: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Status</label>
                    <select className="form-select" value={currentPay.status} onChange={(e) => setCurrentPay({...currentPay, status: e.target.value})}>
                      <option>Unpaid</option>
                      <option>Paid</option>
                    </select>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="bg-light p-3 rounded-3 d-flex justify-content-between align-items-center">
                       <span className="fw-bold">Net Pay:</span>
                       <span className="fs-5 fw-bold text-primary">${calculateNetPay(currentPay.basicSalary, currentPay.allowances, currentPay.deductions).toLocaleString()}</span>
                    </div>
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

export default Payroll;
