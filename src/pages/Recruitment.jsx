import React, { useState } from 'react';
import { UserPlus, Briefcase, FileText, CheckCircle, Search, Filter, Edit2, Trash2, MapPin, MoreVertical, UserCheck, Users, Plus } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import { useApp } from '../context/AppContext';
import { getStatusClass, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const Recruitment = () => {
  const { state, addJob, updateJob, deleteJob, toggleJobStatus, addCandidate, updateCandidate, deleteCandidate, hireCandidate, addEmployee, deleteEmployee, confirmAction } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Job Modal State
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [currentJob, setCurrentJob] = useState({
    title: '', department: 'IT', location: '', type: 'Full-time', status: 'Open', description: ''
  });

  // Candidate Modal State
  const [currentCandidate, setCurrentCandidate] = useState({
    name: '', jobId: '', email: '', phone: ''
  });

  // Expanded View State
  const [expandedJobId, setExpandedJobId] = useState(null);

  // Employee Modal State (Internal)
  const [currentEmp, setCurrentEmp] = useState({
    name: '', department: 'IT', role: '', email: '', phone: '', salary: '', joinDate: new Date().toISOString().split('T')[0], gender: 'Male', status: 'Active'
  });

  const filteredJobs = state.jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalApplicants = state.jobs.reduce((acc, j) => acc + j.applicants, 0);
  const interviews = state.candidates.filter(c => c.status === 'Interview Scheduled').length;
  const hired = state.candidates.filter(c => c.status === 'Hired').length;

  // Handlers
  const handleSaveJob = (e) => {
    e.preventDefault();
    if (!currentJob.title || !currentJob.location) {
      toast.error('Title and Location are required');
      return;
    }
    if (isEditingJob) updateJob(currentJob);
    else addJob(currentJob);
    document.getElementById('closeJobModal').click();
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!currentCandidate.name || !currentCandidate.jobId || !currentCandidate.email) {
      toast.error('Please fill all required fields');
      return;
    }
    addCandidate(currentCandidate);
    document.getElementById('closeCandidateModal').click();
    setCurrentCandidate({ name: '', jobId: '', email: '', phone: '' });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!currentEmp.name || !currentEmp.email) {
      toast.error('Name and Email are required');
      return;
    }
    addEmployee(currentEmp);
    document.getElementById('closeEmpModal').click();
    setCurrentEmp({ name: '', department: 'IT', role: '', email: '', phone: '', salary: '', joinDate: new Date().toISOString().split('T')[0], gender: 'Male', status: 'Active' });
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Recruitment</h4>
          <p className="text-muted small mb-0">Manage job openings and candidate pipeline.</p>
        </div>
        <div className="d-flex gap-2 flex-wrap mt-3 mt-md-0">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#quickEmployeeModal">
            <Users size={18} />
            <span className="d-none d-sm-inline">Add Employee</span>
          </button>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#candidateModal">
            <UserPlus size={18} />
            <span className="d-none d-sm-inline">Add Candidate</span>
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#jobModal" onClick={() => {
            setIsEditingJob(false);
            setCurrentJob({ title: '', department: 'IT', location: '', type: 'Full-time', status: 'Open', description: '' });
          }}>
            <Briefcase size={18} />
            <span className="d-none d-sm-inline">Create Job</span>
            <span className="d-inline d-sm-none">Job</span>
          </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-3">
          <StatCard title="Total Openings" value={state.jobs.length} icon={<Briefcase size={24} />} color="#4f46e5" />
        </div>
        <div className="col-12 col-md-3">
          <StatCard title="Total Applicants" value={totalApplicants} icon={<UserPlus size={24} />} color="#10b981" />
        </div>
        <div className="col-12 col-md-3">
          <StatCard title="Interviews" value={interviews} icon={<FileText size={24} />} color="#f59e0b" />
        </div>
        <div className="col-12 col-md-3">
          <StatCard title="Hired" value={hired} icon={<CheckCircle size={24} />} color="#0ea5e9" />
        </div>
      </div>

      <div className="card border-0 p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><Search size={18} className="text-muted" /></span>
              <input type="text" className="form-control bg-light border-0" placeholder="Search jobs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end gap-2">
            <button className="btn btn-light border d-flex align-items-center gap-2">
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="col-12 col-lg-6">
            <div className="card h-100 p-4 border" style={{ borderColor: expandedJobId === job.id ? '#4f46e5' : '' }}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex gap-3 align-items-center">
                   <div className="bg-primary-subtle p-3 rounded-3 text-primary">
                     <Briefcase size={24} />
                   </div>
                   <div>
                     <h6 className="fw-bold mb-1">{job.title}</h6>
                     <div className="d-flex align-items-center gap-2 text-muted small">
                        <span>{job.department}</span> • 
                        <span className="d-flex align-items-center gap-1"><MapPin size={12}/> {job.location}</span> • 
                        <span>{job.type}</span>
                     </div>
                   </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className={`badge rounded-pill fw-normal px-3 py-2 ${getStatusClass(job.status)}`}>
                    {job.status}
                  </span>
                  <div className="dropdown">
                    <button className="btn btn-light btn-sm rounded-circle p-1" data-bs-toggle="dropdown"><MoreVertical size={16} /></button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                      <li><button className="dropdown-item py-2 small" onClick={() => toggleJobStatus(job.id)}>{job.status === 'Open' ? 'Close Job' : 'Reopen Job'}</button></li>
                      <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#jobModal" onClick={() => { setIsEditingJob(true); setCurrentJob(job); }}><Edit2 size={14} /> Edit</button></li>
                      <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2 text-danger" onClick={() => { 
                        confirmAction({
                          title: 'Delete Job',
                          message: 'Are you sure you want to delete this job and all associated candidates? This action cannot be undone.',
                          onConfirm: () => deleteJob(job.id),
                          type: 'danger'
                        });
                      }}><Trash2 size={14} /> Delete</button></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-muted small mb-4">{job.description}</p>
              
              <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-3">
                <div>
                  <p className="mb-0 fw-bold small">{job.applicants}</p>
                  <p className="mb-0 text-muted x-small">Applicants</p>
                </div>
                <button className="btn btn-outline-primary btn-sm px-4" onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}>
                  {expandedJobId === job.id ? 'Hide Applications' : 'View Applications'}
                </button>
              </div>

              {/* Candidates List (Expanded) */}
              {expandedJobId === job.id && (
                <div className="mt-4 pt-4 border-top">
                   <h6 className="fw-bold mb-3 small text-muted text-uppercase">Candidates Pipeline</h6>
                   {state.candidates.filter(c => c.jobId === job.id).length === 0 ? (
                     <p className="text-muted small">No candidates applied yet.</p>
                   ) : (
                     <ul className="list-group list-group-flush">
                       {state.candidates.filter(c => c.jobId === job.id).map(cnd => (
                         <li key={cnd.id} className="list-group-item px-0 py-2 border-0 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                               <img src={cnd.avatar} className="rounded-circle" width="32" height="32" alt={cnd.name}/>
                               <div>
                                 <p className="mb-0 small fw-bold">{cnd.name}</p>
                                 <p className="mb-0 x-small text-muted">{cnd.email}</p>
                               </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                               <select className="form-select form-select-sm border-0 bg-light" style={{width: 140, fontSize: '12px'}} value={cnd.status} onChange={(e) => updateCandidate({...cnd, status: e.target.value})}>
                                  <option>Applied</option>
                                  <option>Shortlisted</option>
                                  <option>Interview Scheduled</option>
                                  <option>Hired</option>
                                  <option>Rejected (Candidate)</option>
                               </select>
                               {cnd.status !== 'Hired' && (
                                 <button 
                                   className="btn btn-light btn-sm text-success p-1 border-0" 
                                   title="Hire Candidate"
                                   onClick={() => { 
                                     confirmAction({
                                       title: 'Hire Candidate',
                                       message: `Hire ${cnd.name}? This will automatically create an employee record for them.`,
                                       onConfirm: () => hireCandidate(cnd.id, job.title, job.department),
                                       type: 'success'
                                     });
                                   }}
                                 >
                                   <UserCheck size={16}/>
                                 </button>
                               )}
                               <button className="btn btn-light btn-sm text-danger p-1 border-0" onClick={() => { 
                                 confirmAction({
                                   title: 'Delete Candidate',
                                   message: `Are you sure you want to remove ${cnd.name} from the pipeline?`,
                                   onConfirm: () => deleteCandidate(cnd.id),
                                   type: 'danger'
                                 });
                               }}><Trash2 size={14}/></button>
                            </div>
                         </li>
                       ))}
                     </ul>
                   )}
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredJobs.length === 0 && <p className="text-center text-muted col-12 py-5">No jobs found.</p>}
      </div>

      <div className="mt-5 mb-4">
        <h5 className="fw-bold mb-3">Recently Hired Employees</h5>
        <div className="card border-0 shadow-sm overflow-hidden">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th className="ps-4">Employee</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Join Date</th>
                  <th className="pe-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {state.employees.slice(0, 5).map(emp => (
                  <tr key={emp.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <img src={emp.avatar} className="rounded-circle me-3" width="32" height="32" alt={emp.name}/>
                        <span className="small fw-bold">{emp.name}</span>
                      </div>
                    </td>
                    <td><span className="small">{emp.department}</span></td>
                    <td><span className="small">{emp.role}</span></td>
                    <td><span className="small">{formatDate(emp.joinDate)}</span></td>
                    <td className="pe-4 text-end">
                      <button className="btn btn-light btn-sm text-danger p-1 border-0" onClick={() => {
                        confirmAction({
                          title: 'Remove Employee',
                          message: `Are you sure you want to remove ${emp.name}? This will delete their employee record.`,
                          onConfirm: () => deleteEmployee(emp.id, emp.name),
                          type: 'danger'
                        });
                      }}><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
                {state.employees.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No employees hired yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Job Modal */}
      <div className="modal fade" id="jobModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">{isEditingJob ? 'Edit Job' : 'Create Job Opening'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeJobModal"></button>
            </div>
            <form onSubmit={handleSaveJob}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Job Title *</label>
                    <input type="text" className="form-control" value={currentJob.title} onChange={e => setCurrentJob({...currentJob, title: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Department</label>
                    <select className="form-select" value={currentJob.department} onChange={e => setCurrentJob({...currentJob, department: e.target.value})}>
                      <option>IT</option>
                      <option>HR</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                      <option>Design</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Location *</label>
                    <input type="text" className="form-control" value={currentJob.location} onChange={e => setCurrentJob({...currentJob, location: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Employment Type</label>
                    <select className="form-select" value={currentJob.type} onChange={e => setCurrentJob({...currentJob, type: e.target.value})}>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Description</label>
                    <textarea className="form-control" rows="4" value={currentJob.description} onChange={e => setCurrentJob({...currentJob, description: e.target.value})}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4">Save Job</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add Candidate Modal */}
      <div className="modal fade" id="candidateModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Add Candidate</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeCandidateModal"></button>
            </div>
            <form onSubmit={handleAddCandidate}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Job applied for *</label>
                    <select className="form-select" value={currentCandidate.jobId} onChange={e => setCurrentCandidate({...currentCandidate, jobId: e.target.value})} required>
                      <option value="">Select Job</option>
                      {state.jobs.filter(j => j.status === 'Open').map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Candidate Name *</label>
                    <input type="text" className="form-control" value={currentCandidate.name} onChange={e => setCurrentCandidate({...currentCandidate, name: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Email *</label>
                    <input type="email" className="form-control" value={currentCandidate.email} onChange={e => setCurrentCandidate({...currentCandidate, email: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Phone</label>
                    <input type="text" className="form-control" value={currentCandidate.phone} onChange={e => setCurrentCandidate({...currentCandidate, phone: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4">Add Candidate</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Quick Add Employee Modal */}
      <div className="modal fade" id="quickEmployeeModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Quick Add Employee</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeEmpModal"></button>
            </div>
            <form onSubmit={handleAddEmployee}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Full Name *</label>
                    <input type="text" className="form-control" value={currentEmp.name} onChange={(e) => setCurrentEmp({...currentEmp, name: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Email Address *</label>
                    <input type="email" className="form-control" value={currentEmp.email} onChange={(e) => setCurrentEmp({...currentEmp, email: e.target.value})} required />
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
                    <input type="text" className="form-control" value={currentEmp.role} onChange={(e) => setCurrentEmp({...currentEmp, role: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Salary</label>
                    <input type="number" className="form-control" value={currentEmp.salary} onChange={(e) => setCurrentEmp({...currentEmp, salary: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Join Date</label>
                    <input type="date" className="form-control" value={currentEmp.joinDate} onChange={(e) => setCurrentEmp({...currentEmp, joinDate: e.target.value})} required />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4">Add Employee</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
