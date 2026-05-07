import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, MoreVertical, Edit2, Trash2, Mail, FileDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadCSV, getStatusClass, formatDate, truncate } from '../utils/helpers';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const Employees = () => {
  const { state, addEmployee, updateEmployee, deleteEmployee, confirmAction } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmp, setCurrentEmp] = useState({
    name: '', department: 'IT', role: '', email: '', phone: '', salary: '', joinDate: '', gender: 'Male', status: 'Active'
  });
  
  // Filtering
  const filteredEmployees = useMemo(() => {
    return state.employees.filter(emp => {
      const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = filterDept === 'All' || emp.department === filterDept;
      const matchStatus = filterStatus === 'All' || emp.status === filterStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [state.employees, searchTerm, filterDept, filterStatus]);

  // Handlers
  const handleExport = () => {
    const dataToExport = filteredEmployees.map(({ avatar, ...rest }) => rest);
    downloadCSV(dataToExport, 'employees_export.csv');
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentEmp({ name: '', department: 'IT', role: '', email: '', phone: '', salary: '', joinDate: '', gender: 'Male', status: 'Active' });
  };

  const openEditModal = (emp) => {
    setIsEditing(true);
    setCurrentEmp(emp);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentEmp.name || !currentEmp.email) {
      toast.error('Name and Email are required.');
      return;
    }
    if (isEditing) {
      updateEmployee(currentEmp);
    } else {
      addEmployee(currentEmp);
    }
    // Close modal hack (requires bootstrap js)
    document.getElementById('closeEmpModal').click();
  };

  const handleDelete = (id, name) => {
    confirmAction({
      title: 'Delete Employee',
      message: `Are you sure you want to delete ${name}? This will remove all associated records.`,
      onConfirm: () => deleteEmployee(id, name),
      type: 'danger'
    });
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Employees</h4>
          <p className="text-muted small mb-0">Manage your workforce efficiently.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#addEmployeeModal" onClick={openAddModal}>
          <Plus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="card border-0 p-4 mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <Search size={18} className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                placeholder="Search by name, ID or role..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
             <select className="form-select bg-light border-0" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                <option value="All">All Departments</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
             </select>
          </div>
          <div className="col-12 col-md-3">
             <select className="form-select bg-light border-0" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
             </select>
          </div>
          <div className="col-12 col-md-2 d-flex justify-content-md-end gap-2">
            <button className="btn btn-light border d-flex align-items-center gap-2 w-100 justify-content-center" onClick={handleExport}>
              <FileDown size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card border-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th className="ps-4">Employee</th>
                <th>ID</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th className="pe-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} style={{ cursor: 'pointer' }}>
                  <td className="ps-4" onClick={() => navigate(`/employees/${emp.id}`)}>
                    <div className="d-flex align-items-center">
                      <img src={emp.avatar} alt={emp.name} className="rounded-circle me-3" width="40" height="40" style={{objectFit: 'cover'}} />
                      <div>
                        <p className="mb-0 fw-bold small">{emp.name}</p>
                        <p className="mb-0 text-muted x-small">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td onClick={() => navigate(`/employees/${emp.id}`)}><span className="small">{emp.id}</span></td>
                  <td onClick={() => navigate(`/employees/${emp.id}`)}><span className="small">{emp.department}</span></td>
                  <td onClick={() => navigate(`/employees/${emp.id}`)}><span className="small">{truncate(emp.role, 20)}</span></td>
                  <td onClick={() => navigate(`/employees/${emp.id}`)}>
                    <span className={`badge rounded-pill small fw-normal px-3 py-2 ${getStatusClass(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td onClick={() => navigate(`/employees/${emp.id}`)}><span className="small">{formatDate(emp.joinDate)}</span></td>
                  <td className="pe-4 text-end">
                    <div className="dropdown">
                      <button className="btn btn-light btn-sm rounded-circle p-1" data-bs-toggle="dropdown" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={16} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                        <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2" onClick={(e) => { e.stopPropagation(); navigate(`/employees/${emp.id}`); }}>View Profile</button></li>
                        <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addEmployeeModal" onClick={(e) => { e.stopPropagation(); openEditModal(emp); }}><Edit2 size={14} /> Edit</button></li>
                        <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2 text-danger" onClick={(e) => { e.stopPropagation(); handleDelete(emp.id, emp.name); }}><Trash2 size={14} /> Delete</button></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">No employees found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Employee Modal */}
      <div className="modal fade" id="addEmployeeModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeEmpModal"></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Full Name *</label>
                    <input type="text" className="form-control" placeholder="Enter name" value={currentEmp.name} onChange={(e) => setCurrentEmp({...currentEmp, name: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Email Address *</label>
                    <input type="email" className="form-control" placeholder="email@example.com" value={currentEmp.email} onChange={(e) => setCurrentEmp({...currentEmp, email: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Phone Number</label>
                    <input type="text" className="form-control" placeholder="+1234567890" value={currentEmp.phone} onChange={(e) => setCurrentEmp({...currentEmp, phone: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Gender</label>
                    <select className="form-select" value={currentEmp.gender} onChange={(e) => setCurrentEmp({...currentEmp, gender: e.target.value})}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Department</label>
                    <select className="form-select" value={currentEmp.department} onChange={(e) => setCurrentEmp({...currentEmp, department: e.target.value})}>
                      <option>IT</option>
                      <option>HR</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                      <option>Design</option>
                      <option>Operations</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Role</label>
                    <input type="text" className="form-control" placeholder="Job title" value={currentEmp.role} onChange={(e) => setCurrentEmp({...currentEmp, role: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Basic Salary</label>
                    <input type="number" className="form-control" placeholder="e.g. 50000" value={currentEmp.salary} onChange={(e) => setCurrentEmp({...currentEmp, salary: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Join Date</label>
                    <input type="date" className="form-control" value={currentEmp.joinDate} onChange={(e) => setCurrentEmp({...currentEmp, joinDate: e.target.value})} required />
                  </div>
                  {isEditing && (
                    <div className="col-md-12">
                      <label className="form-label small fw-bold">Status</label>
                      <select className="form-select" value={currentEmp.status} onChange={(e) => setCurrentEmp({...currentEmp, status: e.target.value})}>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>On Leave</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4">{isEditing ? 'Save Changes' : 'Add Employee'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
