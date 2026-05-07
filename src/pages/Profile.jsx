import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Camera, Edit2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { state, updateProfile } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(state.profile || {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@hrmsuite.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    designation: 'HR Manager',
    department: 'Human Resources',
    bio: 'Experienced HR Manager with over 10 years of experience in talent acquisition and employee relations.',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">My Profile</h4>
          <p className="text-muted small mb-0">Manage your personal information.</p>
        </div>
        {!isEditing && (
          <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" onClick={() => setIsEditing(true)}>
            <Edit2 size={16} />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card border-0 p-4 text-center h-100">
            <div className="position-relative d-inline-block mx-auto mb-3">
              <img src={formData.avatar} alt="Profile" className="rounded-circle" width="120" height="120" style={{objectFit: 'cover'}} />
              {isEditing && (
                <button className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 p-2" title="Change Photo">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <h5 className="fw-bold mb-1">{formData.firstName} {formData.lastName}</h5>
            <p className="text-muted small mb-3">{formData.designation}</p>
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 fw-normal mb-4">
              {formData.department}
            </span>
            
            <div className="text-start border-top pt-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <Mail size={16} className="text-muted" />
                <span className="small">{formData.email}</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Phone size={16} className="text-muted" />
                <span className="small">{formData.phone}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <MapPin size={16} className="text-muted" />
                <span className="small">{formData.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card border-0 p-4 h-100">
            <h6 className="fw-bold mb-4">{isEditing ? 'Edit Information' : 'Personal Information'}</h6>
            
            <form onSubmit={handleSave}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">First Name</label>
                  <input type="text" className="form-control" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Last Name</label>
                  <input type="text" className="form-control" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Email Address</label>
                  <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Phone Number</label>
                  <input type="text" className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Designation</label>
                  <input type="text" className="form-control" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Location</label>
                  <input type="text" className="form-control" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Bio</label>
                  <textarea className="form-control" rows="4" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} disabled={!isEditing}></textarea>
                </div>
                
                {isEditing && (
                  <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-light px-4" onClick={() => { setIsEditing(false); setFormData(state.profile); }}>Cancel</button>
                    <button type="submit" className="btn btn-primary px-4">Save Changes</button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
