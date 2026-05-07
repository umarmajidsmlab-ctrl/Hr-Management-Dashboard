import React, { useState } from 'react';
import { GraduationCap, BookOpen, CheckCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import { useApp } from '../context/AppContext';
import { getStatusClass, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const Training = () => {
  const { state, addTraining, updateTraining, deleteTraining, confirmAction } = useApp();
  
  // Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [currentTrain, setCurrentTrain] = useState({
    title: '', trainer: '', department: 'All', status: 'Upcoming', startDate: '', endDate: '', description: '', enrolledEmployees: []
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentTrain.title || !currentTrain.trainer) {
      toast.error('Title and Trainer are required');
      return;
    }
    if (isEditing) updateTraining(currentTrain);
    else addTraining(currentTrain);
    document.getElementById('closeTrainModal').click();
  };

  const activePrograms = state.training.filter(t => t.status === 'Ongoing').length;
  const totalParticipants = state.training.reduce((acc, t) => acc + (t.enrolledEmployees?.length || 0), 0);
  const completedRate = state.training.length > 0 ? Math.round((state.training.filter(t => t.status === 'Completed').length / state.training.length) * 100) : 0;

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Training</h4>
          <p className="text-muted small mb-0">Upskill your employees with curated programs.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#trainModal" onClick={() => {
          setIsEditing(false);
          setCurrentTrain({ title: '', trainer: '', department: 'All', status: 'Upcoming', startDate: '', endDate: '', description: '', enrolledEmployees: [] });
        }}>
          <Plus size={18} />
          <span>New Training</span>
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <StatCard title="Active Programs" value={activePrograms} icon={<BookOpen size={24} />} color="#4f46e5" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard title="Total Participants" value={totalParticipants} icon={<GraduationCap size={24} />} color="#10b981" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard title="Completion Rate" value={`${completedRate}%`} icon={<CheckCircle size={24} />} color="#0ea5e9" />
        </div>
      </div>

      <div className="row g-4">
        {state.training.map((program) => {
          const progress = program.status === 'Completed' ? 100 : program.status === 'Ongoing' ? 50 : 0;
          return (
            <div key={program.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className={`badge rounded-pill fw-normal px-3 py-2 ${getStatusClass(program.status)}`}>
                    {program.status}
                  </span>
                  <p className="mb-0 text-muted small">{formatDate(program.startDate)}</p>
                </div>
                <h6 className="fw-bold mb-2">{program.title}</h6>
                <p className="text-muted small mb-4">Instructor: {program.trainer}</p>
                
                <div className="progress mb-4" style={{ height: '6px' }}>
                  <div className="progress-bar rounded-pill" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="small text-muted">{program.enrolledEmployees?.length || 0} Enrolled</span>
                  <div className="d-flex gap-2">
                    <button className="btn btn-light btn-sm px-2 border" data-bs-toggle="modal" data-bs-target="#trainModal" onClick={() => { setIsEditing(true); setCurrentTrain(program); }}><Edit2 size={14} /></button>
                    <button className="btn btn-light btn-sm px-2 border text-danger" onClick={() => { 
                      confirmAction({
                        title: 'Delete Training Program',
                        message: 'Are you sure you want to delete this training program?',
                        onConfirm: () => deleteTraining(program.id),
                        type: 'danger'
                      });
                    }}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {state.training.length === 0 && <p className="text-center text-muted col-12 py-5">No training programs available.</p>}
      </div>

      {/* Modal */}
      <div className="modal fade" id="trainModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">{isEditing ? 'Edit Training' : 'New Training'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeTrainModal"></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Title *</label>
                    <input type="text" className="form-control" value={currentTrain.title} onChange={e => setCurrentTrain({...currentTrain, title: e.target.value})} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Trainer *</label>
                    <input type="text" className="form-control" value={currentTrain.trainer} onChange={e => setCurrentTrain({...currentTrain, trainer: e.target.value})} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Department</label>
                    <select className="form-select" value={currentTrain.department} onChange={e => setCurrentTrain({...currentTrain, department: e.target.value})}>
                      <option>All</option>
                      <option>IT</option>
                      <option>HR</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                      <option>Design</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Start Date</label>
                    <input type="date" className="form-control" value={currentTrain.startDate} onChange={e => setCurrentTrain({...currentTrain, startDate: e.target.value})} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">End Date</label>
                    <input type="date" className="form-control" value={currentTrain.endDate} onChange={e => setCurrentTrain({...currentTrain, endDate: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Status</label>
                    <select className="form-select" value={currentTrain.status} onChange={e => setCurrentTrain({...currentTrain, status: e.target.value})}>
                      <option>Upcoming</option>
                      <option>Ongoing</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Description</label>
                    <textarea className="form-control" rows="3" value={currentTrain.description} onChange={e => setCurrentTrain({...currentTrain, description: e.target.value})}></textarea>
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

export default Training;
