import React, { useState } from 'react';
import { TrendingUp, Award, Star, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import { useApp } from '../context/AppContext';
import { getStatusClass } from '../utils/helpers';
import toast from 'react-hot-toast';

const Performance = () => {
  const { state, kpis, addPerformance, updatePerformance, deletePerformance, confirmAction } = useApp();
  
  // Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [currentPerf, setCurrentPerf] = useState({
    employeeId: '', period: 'Q2 2024', score: 5, comments: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentPerf.employeeId || !currentPerf.score) {
      toast.error('Employee and Score are required');
      return;
    }
    const emp = state.employees.find(e => e.id === currentPerf.employeeId);
    const dataToSave = { ...currentPerf, employeeName: emp ? emp.name : 'Unknown' };

    if (isEditing) updatePerformance(dataToSave);
    else addPerformance(dataToSave);
    
    document.getElementById('closePerfModal').click();
  };

  const completedCount = state.performance.length;
  const topPerformersCount = state.performance.filter(p => p.score >= 4.5).length;

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Performance</h4>
          <p className="text-muted small mb-0">Monitor and evaluate employee productivity.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#perfModal" onClick={() => {
          setIsEditing(false);
          setCurrentPerf({ employeeId: state.employees[0]?.id || '', period: 'Q2 2024', score: 5, comments: '' });
        }}>
          <Plus size={18} />
          <span>New Review</span>
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <StatCard title="Avg. Score" value={`${kpis.avgScore} / 5.0`} icon={<TrendingUp size={24} />} color="#4f46e5" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard title="Reviews Completed" value={completedCount} icon={<Star size={24} />} color="#10b981" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard title="Top Performers" value={topPerformersCount} icon={<Award size={24} />} color="#f59e0b" />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 p-0 overflow-hidden h-100">
            <div className="p-4 border-bottom">
              <h6 className="fw-bold mb-0">Recent Reviews</h6>
            </div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th className="ps-4">Employee</th>
                    <th>Period</th>
                    <th>Score</th>
                    <th>Rating</th>
                    <th>Comments</th>
                    <th className="pe-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.performance.map((perf) => {
                     const emp = state.employees.find(e => e.id === perf.employeeId);
                     return (
                      <tr key={perf.id}>
                        <td className="ps-4">
                          <div className="d-flex align-items-center">
                            {emp ? <img src={emp.avatar} alt={emp.name} className="rounded-circle me-3" width="36" height="36" style={{objectFit:'cover'}} /> : <div className="bg-light rounded-circle me-3" style={{width: 36, height: 36}}></div>}
                            <div>
                              <p className="mb-0 fw-bold small">{perf.employeeName}</p>
                              <p className="mb-0 text-muted x-small">{perf.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td><span className="small">{perf.period}</span></td>
                        <td><span className="small fw-bold text-primary">{perf.score}</span></td>
                        <td><span className={`badge rounded-pill small ${getStatusClass(perf.rating)}`}>{perf.rating}</span></td>
                        <td><span className="small text-muted text-truncate d-inline-block" style={{maxWidth: 150}}>{perf.comments}</span></td>
                        <td className="pe-4 text-end">
                          <div className="dropdown">
                            <button className="btn btn-light btn-sm rounded-circle p-1" data-bs-toggle="dropdown"><MoreVertical size={16} /></button>
                            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                              <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#perfModal" onClick={() => { setIsEditing(true); setCurrentPerf(perf); }}><Edit2 size={14} /> Edit</button></li>
                                <li><button className="dropdown-item py-2 small d-flex align-items-center gap-2 text-danger" onClick={() => { 
                                  confirmAction({
                                    title: 'Delete Performance Review',
                                    message: 'Are you sure you want to delete this performance review?',
                                    onConfirm: () => deletePerformance(perf.id),
                                    type: 'danger'
                                  });
                                }}><Trash2 size={14} /> Delete</button></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                     );
                  })}
                  {state.performance.length === 0 && <tr><td colSpan="6" className="text-center py-4 text-muted">No reviews found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card p-4 h-100">
            <h6 className="fw-bold mb-4">Top Performers</h6>
            <div className="list-group list-group-flush">
              {state.performance.filter(p => p.score >= 4.5).sort((a,b)=>b.score-a.score).slice(0, 5).map((perf) => {
                const emp = state.employees.find(e => e.id === perf.employeeId);
                return (
                  <div key={perf.id} className="list-group-item px-0 py-3 border-0 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      {emp ? <img src={emp.avatar} alt={emp.name} className="rounded-circle me-3" width="40" height="40" style={{objectFit:'cover'}} /> : <div className="bg-light rounded-circle me-3" style={{width: 40, height: 40}}></div>}
                      <div>
                        <p className="mb-0 fw-bold small">{perf.employeeName}</p>
                        <p className="mb-0 text-muted x-small">{emp?.role}</p>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="d-flex align-items-center gap-1 text-warning mb-0">
                        <Star size={14} fill="currentColor" />
                        <span className="small fw-bold text-dark">{perf.score.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {state.performance.filter(p => p.score >= 4.5).length === 0 && <p className="text-muted small">No top performers yet.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="perfModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">{isEditing ? 'Edit Review' : 'New Review'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closePerfModal"></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Employee *</label>
                    <select className="form-select" value={currentPerf.employeeId} onChange={(e) => setCurrentPerf({...currentPerf, employeeId: e.target.value})} disabled={isEditing} required>
                      <option value="">Select Employee</option>
                      {state.employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Period</label>
                    <input type="text" className="form-control" value={currentPerf.period} onChange={(e) => setCurrentPerf({...currentPerf, period: e.target.value})} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Score (1-5)</label>
                    <input type="number" step="0.1" min="1" max="5" className="form-control" value={currentPerf.score} onChange={(e) => setCurrentPerf({...currentPerf, score: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Comments</label>
                    <textarea className="form-control" rows="3" value={currentPerf.comments} onChange={(e) => setCurrentPerf({...currentPerf, comments: e.target.value})}></textarea>
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

export default Performance;
