import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeDetails from './pages/EmployeeDetails';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import Payroll from './pages/Payroll';
import Recruitment from './pages/Recruitment';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ConfirmModal from './components/UI/ConfirmModal';
import { useApp } from './context/AppContext';

function App() {
  const { state, hideConfirm } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <div className={`sidebar-overlay ${mobileOpen ? 'show' : ''}`} onClick={() => setMobileOpen(false)}></div>
        
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} />
        
        <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
          <Navbar onMenuClick={toggleMobileSidebar} />
          
          <main className="py-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leaves" element={<LeaveManagement />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/training" element={<Training />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>

      <ConfirmModal 
        show={state.confirmDialog.show}
        title={state.confirmDialog.title}
        message={state.confirmDialog.message}
        onConfirm={state.confirmDialog.onConfirm}
        onCancel={hideConfirm}
        type={state.confirmDialog.type}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          display: none;
        }
        .sidebar-overlay.show {
          display: block;
        }
        @media (max-width: 991.98px) {
          .sidebar {
            left: -100%;
            transition: all 0.3s ease;
          }
          .sidebar.collapsed {
            width: 260px;
          }
          .sidebar-header button {
            display: none;
          }
          .sidebar {
            left: ${mobileOpen ? '0' : '-100%'};
          }
          .main-content {
            margin-left: 0 !important;
          }
          .search-bar {
            display: none !important;
          }
        }
      `}} />
    </Router>
  );
}

export default App;
