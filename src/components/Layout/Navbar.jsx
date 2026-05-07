import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, MessageSquare, Menu, User, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const { state, kpis, markAllRead, markNotificationRead, clearAll, sendMessage } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showMessages, setShowMessages] = useState(false);
  const [msgInput, setMsgInput] = useState('');

  // Dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Refs for clicking outside
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/employees?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    clearAll();
    navigate('/');
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (msgInput.trim()) {
      sendMessage(msgInput);
      setMsgInput('');
    }
  };

  return (
    <>
      <nav className="top-navbar">
        <div className="d-flex align-items-center flex-grow-1">
          <button className="btn btn-light d-lg-none me-3" onClick={onMenuClick}>
            <Menu size={20} />
          </button>
          <form onSubmit={handleSearch} className="input-group search-bar d-none d-md-flex" style={{ maxWidth: '400px' }}>
            <span className="input-group-text bg-light border-0">
              <Search size={18} className="text-muted" />
            </span>
            <input 
              type="text" 
              className="form-control bg-light border-0" 
              placeholder="Search employees..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Messages Icon */}
          <button className="btn btn-light position-relative rounded-circle p-2" onClick={() => setShowMessages(true)}>
            <MessageSquare size={20} className="text-muted" />
            {state.messages.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                {state.messages.length}
              </span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          <div className="dropdown" ref={notifRef}>
            <button 
              className="btn btn-light position-relative rounded-circle p-2" 
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} className="text-muted" />
              {kpis.unreadNtf > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '10px' }}>
                  {kpis.unreadNtf}
                </span>
              )}
            </button>
            <div className={`dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-0 ${showNotifications ? 'show' : ''}`} style={{ width: '320px', position: 'absolute', right: 0 }}>
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
                <h6 className="mb-0 fw-bold">Notifications</h6>
                {kpis.unreadNtf > 0 && (
                  <button className="btn btn-sm btn-link text-decoration-none p-0" onClick={markAllRead}>Mark all read</button>
                )}
              </div>
              <div className="list-group list-group-flush" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {state.notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted small">No notifications</div>
                ) : (
                  state.notifications.map(n => (
                    <button 
                      key={n.id} 
                      className={`list-group-item list-group-item-action p-3 border-bottom-0 ${n.read ? 'text-muted' : 'fw-bold bg-light'}`}
                      onClick={() => markNotificationRead(n.id)}
                    >
                      <p className="mb-1 small">{n.message}</p>
                      <small className="text-muted" style={{ fontSize: '11px' }}>{n.time}</small>
                    </button>
                  ))
                )}
              </div>
              <div className="p-2 text-center border-top bg-light">
                <button className="btn btn-sm btn-link text-decoration-none w-100">View All</button>
              </div>
            </div>
          </div>
          
          <div className="vr mx-2 d-none d-sm-block"></div>
          
          {/* Profile Dropdown */}
          <div className="dropdown" ref={profileRef}>
            <button 
              className="btn btn-light d-flex align-items-center gap-2 px-2 py-1 rounded-pill dropdown-toggle border-0" 
              type="button" 
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="bg-primary rounded-circle p-1 overflow-hidden" style={{ width: 28, height: 28 }}>
                {state.profile?.avatar ? (
                   <img src={state.profile.avatar} alt="Profile" className="w-100 h-100 rounded-circle" style={{ objectFit: 'cover' }} />
                ) : (
                   <User size={16} color="white" />
                )}
              </div>
              <div className="text-start d-none d-sm-block">
                <p className="small fw-bold mb-0 lh-1">{state.profile?.firstName || 'Admin'}</p>
                <p className="x-small text-muted mb-0 lh-1" style={{ fontSize: '11px' }}>{state.profile?.designation || 'HR Manager'}</p>
              </div>
            </button>
            <ul className={`dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 ${showProfile ? 'show' : ''}`} style={{ position: 'absolute', right: 0 }}>
              <li>
                <NavLink 
                  className="dropdown-item py-2 px-3 small" 
                  to="/profile"
                  onClick={() => setShowProfile(false)}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink 
                  className="dropdown-item py-2 px-3 small" 
                  to="/settings"
                  onClick={() => setShowProfile(false)}
                >
                  Settings
                </NavLink>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button 
                  className="dropdown-item py-2 px-3 small text-danger" 
                  onClick={() => {
                    setShowProfile(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Messages Drawer */}
      <div className={`offcanvas offcanvas-end ${showMessages ? 'show' : ''}`} tabIndex="-1" style={{ visibility: showMessages ? 'visible' : 'hidden' }}>
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">Messages</h5>
          <button type="button" className="btn-close" onClick={() => setShowMessages(false)}></button>
        </div>
        <div className="offcanvas-body p-0 d-flex flex-column bg-light">
          <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-3">
             {state.messages.map(m => (
               <div key={m.id} className={`d-flex gap-2 ${m.isAdmin ? 'flex-row-reverse' : ''}`}>
                  <img src={m.avatar} className="rounded-circle" width="32" height="32" alt={m.sender} />
                  <div className={`p-2 rounded-3 ${m.isAdmin ? 'bg-primary text-white' : 'bg-white border'}`} style={{ maxWidth: '75%' }}>
                    <p className="mb-1 small lh-sm">{m.message}</p>
                    <small className={m.isAdmin ? 'text-white-50' : 'text-muted'} style={{ fontSize: '10px' }}>{m.time}</small>
                  </div>
               </div>
             ))}
          </div>
          <form onSubmit={handleSendMsg} className="p-3 bg-white border-top">
            <div className="input-group">
              <input type="text" className="form-control form-control-sm border-end-0" placeholder="Type a message..." value={msgInput} onChange={(e) => setMsgInput(e.target.value)} />
              <button className="btn btn-outline-secondary btn-sm border-start-0 text-primary fw-bold" type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
      {showMessages && <div className="offcanvas-backdrop fade show" onClick={() => setShowMessages(false)}></div>}
    </>
  );
};

export default Navbar;
