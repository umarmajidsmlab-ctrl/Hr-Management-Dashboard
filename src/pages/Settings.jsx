import React, { useState } from 'react';
import { Save, Bell, Shield, Globe, Users, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [settings, setSettings] = useState({
    companyName: 'TechCorp Solutions',
    email: 'admin@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Boulevard, Silicon Valley, CA 94043',
    timezone: 'UTC-08:00 (Pacific Time)',
    currency: 'USD ($)',
    language: 'English (US)',
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyReports: false,
      leaveApprovals: true
    }
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  const tabs = [
    { id: 'General', icon: <Briefcase size={18} /> },
    { id: 'Notifications', icon: <Bell size={18} /> },
    { id: 'Security', icon: <Shield size={18} /> },
    { id: 'Localization', icon: <Globe size={18} /> },
    { id: 'Roles & Permissions', icon: <Users size={18} /> }
  ];

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Settings</h4>
          <p className="text-muted small mb-0">Configure your HR management system.</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card border-0 overflow-hidden">
            <div className="list-group list-group-flush">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`list-group-item list-group-item-action border-0 p-3 d-flex align-items-center gap-3 ${activeTab === tab.id ? 'bg-primary text-white fw-bold' : 'text-muted'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className={activeTab === tab.id ? 'text-white' : 'text-muted'}>{tab.icon}</span>
                  <span className="small">{tab.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-9">
          <div className="card border-0 p-0">
            <div className="p-4 border-bottom">
              <h6 className="fw-bold mb-0">{activeTab} Settings</h6>
            </div>
            <div className="p-4">
              <form onSubmit={handleSave}>
                {activeTab === 'General' && (
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">Company Name</label>
                      <input type="text" className="form-control" value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">Contact Email</label>
                      <input type="email" className="form-control" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">Phone Number</label>
                      <input type="text" className="form-control" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-muted">Office Address</label>
                      <textarea className="form-control" rows="3" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})}></textarea>
                    </div>
                  </div>
                )}

                {activeTab === 'Notifications' && (
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="form-check form-switch d-flex justify-content-between align-items-center mb-4 ps-0">
                        <div>
                          <label className="form-check-label fw-bold small d-block mb-1">Email Alerts</label>
                          <p className="text-muted x-small mb-0">Receive daily digest of activities.</p>
                        </div>
                        <input className="form-check-input ms-0" type="checkbox" role="switch" checked={settings.notifications.emailAlerts} onChange={e => setSettings({...settings, notifications: {...settings.notifications, emailAlerts: e.target.checked}})} />
                      </div>
                      <hr className="my-4" />
                      <div className="form-check form-switch d-flex justify-content-between align-items-center mb-4 ps-0">
                        <div>
                          <label className="form-check-label fw-bold small d-block mb-1">Push Notifications</label>
                          <p className="text-muted x-small mb-0">Get instant alerts on your browser.</p>
                        </div>
                        <input className="form-check-input ms-0" type="checkbox" role="switch" checked={settings.notifications.pushNotifications} onChange={e => setSettings({...settings, notifications: {...settings.notifications, pushNotifications: e.target.checked}})} />
                      </div>
                      <hr className="my-4" />
                      <div className="form-check form-switch d-flex justify-content-between align-items-center mb-4 ps-0">
                        <div>
                          <label className="form-check-label fw-bold small d-block mb-1">Weekly Reports</label>
                          <p className="text-muted x-small mb-0">Automated reports every Monday morning.</p>
                        </div>
                        <input className="form-check-input ms-0" type="checkbox" role="switch" checked={settings.notifications.weeklyReports} onChange={e => setSettings({...settings, notifications: {...settings.notifications, weeklyReports: e.target.checked}})} />
                      </div>
                      <hr className="my-4" />
                      <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                        <div>
                          <label className="form-check-label fw-bold small d-block mb-1">Leave Approvals</label>
                          <p className="text-muted x-small mb-0">Notify when an employee requests leave.</p>
                        </div>
                        <input className="form-check-input ms-0" type="checkbox" role="switch" checked={settings.notifications.leaveApprovals} onChange={e => setSettings({...settings, notifications: {...settings.notifications, leaveApprovals: e.target.checked}})} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Security' && (
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">Current Password</label>
                      <input type="password" className="form-control" placeholder="••••••••" />
                    </div>
                    <div className="w-100 d-none d-md-block m-0"></div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">New Password</label>
                      <input type="password" className="form-control" placeholder="••••••••" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">Confirm New Password</label>
                      <input type="password" className="form-control" placeholder="••••••••" />
                    </div>
                    <div className="col-12 mt-4">
                      <button type="button" className="btn btn-outline-primary btn-sm">Enable Two-Factor Authentication</button>
                    </div>
                  </div>
                )}

                {activeTab === 'Localization' && (
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">Timezone</label>
                      <select className="form-select" value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})}>
                        <option>UTC-08:00 (Pacific Time)</option>
                        <option>UTC-05:00 (Eastern Time)</option>
                        <option>UTC+00:00 (GMT)</option>
                        <option>UTC+05:30 (IST)</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">Currency</label>
                      <select className="form-select" value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})}>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>INR (₹)</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted">System Language</label>
                      <select className="form-select" value={settings.language} onChange={e => setSettings({...settings, language: e.target.value})}>
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'Roles & Permissions' && (
                  <div className="alert alert-info border-0 text-center py-5">
                    <Users size={32} className="mb-3" />
                    <h6 className="fw-bold">Role Management</h6>
                    <p className="small mb-0">Role management is available in the Enterprise Plan. Please upgrade to access this feature.</p>
                    <button type="button" className="btn btn-primary btn-sm mt-3 px-4">Upgrade Plan</button>
                  </div>
                )}

                {activeTab !== 'Roles & Permissions' && (
                  <div className="mt-5 d-flex gap-2">
                    <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 px-4">
                      <Save size={16} /> Save Changes
                    </button>
                    <button type="button" className="btn btn-light px-4">Cancel</button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
