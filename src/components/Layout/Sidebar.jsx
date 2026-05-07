import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Clock, 
  CreditCard, 
  UserPlus, 
  TrendingUp, 
  GraduationCap, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed, mobileOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Employees', icon: <Users size={20} />, path: '/employees' },
    { name: 'Attendance', icon: <Clock size={20} />, path: '/attendance' },
    { name: 'Leave Management', icon: <CalendarCheck size={20} />, path: '/leaves' },
    { name: 'Payroll', icon: <CreditCard size={20} />, path: '/payroll' },
    { name: 'Recruitment', icon: <UserPlus size={20} />, path: '/recruitment' },
    { name: 'Performance', icon: <TrendingUp size={20} />, path: '/performance' },
    { name: 'Training', icon: <GraduationCap size={20} />, path: '/training' },
    { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header px-3 py-4 border-bottom">
        <div className={`d-flex align-items-center ${collapsed ? 'justify-content-center' : ''}`}>
          <div className="bg-primary p-2 rounded-3 shadow-sm">
            <Users color="white" size={24} />
          </div>
          {!collapsed && <h5 className="mb-0 fw-bold ms-3 text-nowrap">HRM Suite</h5>}
        </div>
      </div>

      <nav className="sidebar-menu">
        <ul className="ps-0 mb-0">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title={collapsed ? item.name : ''}
                end={item.path === '/'}
              >
                <span className="icon">{item.icon}</span>
                {!collapsed && <span className="nav-text">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-top mt-auto">
        {!collapsed && (
          <div className="bg-light p-3 rounded-3 mb-3">
            <p className="small text-muted mb-2">Review your performance for Q1 2024</p>
            <NavLink to="/performance" className="btn btn-sm btn-primary w-100">View Details</NavLink>
          </div>
        )}
        <NavLink to="/profile" className="d-flex align-items-center text-decoration-none text-dark">
          <img 
            src="https://i.pravatar.cc/150?u=admin" 
            alt="Admin" 
            className="rounded-circle" 
            width={collapsed ? "40" : "32"}
            height={collapsed ? "40" : "32"}
          />
          {!collapsed && (
            <div className="ms-2 overflow-hidden">
              <p className="small fw-bold mb-0 text-truncate">Admin User</p>
              <p className="x-small text-muted mb-0 text-truncate" style={{ fontSize: '11px' }}>admin@hrmsuite.com</p>
            </div>
          )}
        </NavLink>
      </div>

      <div className="px-3 pb-3">
        <button 
          className={`btn btn-light w-100 d-flex align-items-center ${collapsed ? 'justify-content-center' : 'justify-content-between'} border shadow-sm rounded-3 py-2`}
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {!collapsed && <span className="small fw-bold text-muted">Collapse Menu</span>}
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
