import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import {
  initialEmployees,
  initialAttendance,
  initialLeaves,
  initialPayroll,
  initialJobs,
  initialCandidates,
  initialPerformance,
  initialTraining,
  initialNotifications,
  initialMessages,
  initialAttendanceTrend,
  adminProfile,
} from '../data/initialData';
import { generateEmployeeId, generateId, getRatingLabel } from '../utils/helpers';

// ─── Storage helpers ───────────────────────────────────────────────────────────
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* noop */ } };
const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

// ─── Initial State ─────────────────────────────────────────────────────────────
const buildInitialState = () => ({
  employees:       load('hrm_employees',       initialEmployees),
  attendance:      load('hrm_attendance',      initialAttendance),
  leaves:          load('hrm_leaves',          initialLeaves),
  payroll:         load('hrm_payroll',         initialPayroll),
  jobs:            load('hrm_jobs',            initialJobs),
  candidates:      load('hrm_candidates',      initialCandidates),
  performance:     load('hrm_performance',     initialPerformance),
  training:        load('hrm_training',        initialTraining),
  notifications:   load('hrm_notifications',   initialNotifications),
  messages:        load('hrm_messages',        initialMessages),
  attendanceTrend: load('hrm_attendanceTrend', initialAttendanceTrend),
  profile:         load('hrm_profile',         adminProfile),
  confirmDialog: { show: false, title: '', message: '', onConfirm: null, type: 'danger' }
});

// ─── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    // ── Employees ──────────────────────────────────────────────────────────────
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [action.payload, ...state.employees] };
    case 'UPDATE_EMPLOYEE':
      return { ...state, employees: state.employees.map(e => e.id === action.payload.id ? action.payload : e) };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees:   state.employees.filter(e => e.id !== action.payload),
        attendance:  state.attendance.filter(a => a.employeeId !== action.payload),
        leaves:      state.leaves.filter(l => l.employeeId !== action.payload),
        payroll:     state.payroll.filter(p => p.employeeId !== action.payload),
        performance: state.performance.filter(p => p.employeeId !== action.payload),
      };

    // ── Attendance ─────────────────────────────────────────────────────────────
    case 'ADD_ATTENDANCE':
      return { ...state, attendance: [action.payload, ...state.attendance] };
    case 'UPDATE_ATTENDANCE':
      return { ...state, attendance: state.attendance.map(a => a.id === action.payload.id ? action.payload : a) };
    case 'DELETE_ATTENDANCE':
      return { ...state, attendance: state.attendance.filter(a => a.id !== action.payload) };

    // ── Leaves ─────────────────────────────────────────────────────────────────
    case 'ADD_LEAVE':
      return { ...state, leaves: [action.payload, ...state.leaves] };
    case 'UPDATE_LEAVE':
      return { ...state, leaves: state.leaves.map(l => l.id === action.payload.id ? action.payload : l) };
    case 'DELETE_LEAVE':
      return { ...state, leaves: state.leaves.filter(l => l.id !== action.payload) };
    case 'APPROVE_LEAVE':
      return { ...state, leaves: state.leaves.map(l => l.id === action.payload ? { ...l, status: 'Approved' } : l) };
    case 'REJECT_LEAVE':
      return { ...state, leaves: state.leaves.map(l => l.id === action.payload ? { ...l, status: 'Rejected' } : l) };

    // ── Payroll ────────────────────────────────────────────────────────────────
    case 'ADD_PAYROLL':
      return { ...state, payroll: [action.payload, ...state.payroll] };
    case 'UPDATE_PAYROLL':
      return { ...state, payroll: state.payroll.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'DELETE_PAYROLL':
      return { ...state, payroll: state.payroll.filter(p => p.id !== action.payload) };
    case 'MARK_PAID':
      return { ...state, payroll: state.payroll.map(p => p.id === action.payload ? { ...p, status: 'Paid', processedOn: new Date().toISOString().split('T')[0] } : p) };

    // ── Jobs ───────────────────────────────────────────────────────────────────
    case 'ADD_JOB':
      return { ...state, jobs: [action.payload, ...state.jobs] };
    case 'UPDATE_JOB':
      return { ...state, jobs: state.jobs.map(j => j.id === action.payload.id ? action.payload : j) };
    case 'DELETE_JOB':
      return { ...state, jobs: state.jobs.filter(j => j.id !== action.payload), candidates: state.candidates.filter(c => c.jobId !== action.payload) };
    case 'TOGGLE_JOB_STATUS':
      return { ...state, jobs: state.jobs.map(j => j.id === action.payload ? { ...j, status: j.status === 'Open' ? 'Closed' : 'Open' } : j) };

    // ── Candidates ─────────────────────────────────────────────────────────────
    case 'ADD_CANDIDATE':
      return { ...state, candidates: [action.payload, ...state.candidates] };
    case 'UPDATE_CANDIDATE':
      return { ...state, candidates: state.candidates.map(c => c.id === action.payload.id ? action.payload : c) };
    case 'DELETE_CANDIDATE':
      return { ...state, candidates: state.candidates.filter(c => c.id !== action.payload) };

    // ── Performance ────────────────────────────────────────────────────────────
    case 'ADD_PERFORMANCE':
      return { ...state, performance: [action.payload, ...state.performance] };
    case 'UPDATE_PERFORMANCE':
      return { ...state, performance: state.performance.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'DELETE_PERFORMANCE':
      return { ...state, performance: state.performance.filter(p => p.id !== action.payload) };

    // ── Training ───────────────────────────────────────────────────────────────
    case 'ADD_TRAINING':
      return { ...state, training: [action.payload, ...state.training] };
    case 'UPDATE_TRAINING':
      return { ...state, training: state.training.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'DELETE_TRAINING':
      return { ...state, training: state.training.filter(t => t.id !== action.payload) };

    // ── Notifications ──────────────────────────────────────────────────────────
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };
    case 'MARK_ALL_READ':
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };

    // ── Messages ───────────────────────────────────────────────────────────────
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };

    // ── Profile ────────────────────────────────────────────────────────────────
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };

    // ── Reset ──────────────────────────────────────────────────────────────────
    case 'CLEAR_ALL':
      localStorage.clear();
      return buildInitialState();

    case 'SHOW_CONFIRM':
      return { ...state, confirmDialog: { ...action.payload, show: true } };
    case 'HIDE_CONFIRM':
      return { ...state, confirmDialog: { ...state.confirmDialog, show: false } };

    default:
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  // Persist every change to localStorage
  useEffect(() => { save('hrm_employees',       state.employees); },       [state.employees]);
  useEffect(() => { save('hrm_attendance',      state.attendance); },      [state.attendance]);
  useEffect(() => { save('hrm_leaves',          state.leaves); },          [state.leaves]);
  useEffect(() => { save('hrm_payroll',         state.payroll); },         [state.payroll]);
  useEffect(() => { save('hrm_jobs',            state.jobs); },            [state.jobs]);
  useEffect(() => { save('hrm_candidates',      state.candidates); },      [state.candidates]);
  useEffect(() => { save('hrm_performance',     state.performance); },     [state.performance]);
  useEffect(() => { save('hrm_training',        state.training); },        [state.training]);
  useEffect(() => { save('hrm_notifications',   state.notifications); },   [state.notifications]);
  useEffect(() => { save('hrm_messages',        state.messages); },        [state.messages]);
  useEffect(() => { save('hrm_profile',         state.profile); },         [state.profile]);

  // ── Computed KPIs ────────────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    const active    = state.employees.filter(e => e.status === 'Active').length;
    const onLeave   = state.employees.filter(e => e.status === 'On Leave').length;
    const inactive  = state.employees.filter(e => e.status === 'Inactive').length;
    const total     = state.employees.length;
    const pending   = state.leaves.filter(l => l.status === 'Pending').length;
    const paidTotal = state.payroll.filter(p => p.status === 'Paid').reduce((s, p) => s + p.netPay, 0);
    const unpaidCnt = state.payroll.filter(p => p.status === 'Unpaid').length;
    const unreadNtf = state.notifications.filter(n => !n.read).length;
    const openJobs  = state.jobs.filter(j => j.status === 'Open').length;
    const avgScore  = state.performance.length
      ? (state.performance.reduce((s, p) => s + p.score, 0) / state.performance.length).toFixed(1)
      : '0.0';
    return { total, active, onLeave, inactive, pending, paidTotal, unpaidCnt, unreadNtf, openJobs, avgScore };
  }, [state.employees, state.leaves, state.payroll, state.notifications, state.jobs, state.performance]);

  // ── Helpers for adding notifications ─────────────────────────────────────────
  const addNotification = (type, message) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id: generateId('NTF'), type, message, time: new Date().toLocaleString(), read: false },
    });
  };

  // ─── Actions ──────────────────────────────────────────────────────────────────
  const actions = {
    // Employees
    addEmployee: (data) => {
      const emp = { ...data, id: generateEmployeeId(state.employees), avatar: `https://i.pravatar.cc/150?u=${generateId()}` };
      dispatch({ type: 'ADD_EMPLOYEE', payload: emp });
      addNotification('info', `New employee ${emp.name} has been added.`);
      toast.success(`Employee ${emp.name} added successfully!`);
    },
    updateEmployee: (data) => {
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: data });
      toast.success('Employee updated successfully!');
    },
    deleteEmployee: (id, name) => {
      dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
      addNotification('warning', `Employee ${name} has been removed.`);
      toast.success(`Employee ${name} deleted.`);
    },

    // Attendance
    addAttendance: (data) => {
      const rec = { ...data, id: generateId('ATT') };
      dispatch({ type: 'ADD_ATTENDANCE', payload: rec });
      toast.success('Attendance marked successfully!');
    },
    updateAttendance: (data) => {
      dispatch({ type: 'UPDATE_ATTENDANCE', payload: data });
      toast.success('Attendance updated!');
    },
    deleteAttendance: (id) => {
      dispatch({ type: 'DELETE_ATTENDANCE', payload: id });
      toast.success('Attendance record deleted.');
    },

    // Leaves
    addLeave: (data) => {
      const lv = { ...data, id: generateId('LVE'), status: 'Pending', appliedOn: new Date().toISOString().split('T')[0] };
      dispatch({ type: 'ADD_LEAVE', payload: lv });
      addNotification('warning', `New leave request from ${data.employeeName} is pending approval.`);
      toast.success('Leave request submitted!');
    },
    updateLeave: (data) => {
      dispatch({ type: 'UPDATE_LEAVE', payload: data });
      toast.success('Leave request updated!');
    },
    deleteLeave: (id) => {
      dispatch({ type: 'DELETE_LEAVE', payload: id });
      toast.success('Leave request deleted.');
    },
    approveLeave: (id, name) => {
      dispatch({ type: 'APPROVE_LEAVE', payload: id });
      addNotification('success', `Leave request for ${name} has been approved.`);
      toast.success(`Leave approved for ${name}!`);
    },
    rejectLeave: (id, name) => {
      dispatch({ type: 'REJECT_LEAVE', payload: id });
      toast.error(`Leave rejected for ${name}.`);
    },

    // Payroll
    addPayroll: (data) => {
      const pay = { ...data, id: generateId('PAY') };
      dispatch({ type: 'ADD_PAYROLL', payload: pay });
      toast.success('Payroll record added!');
    },
    updatePayroll: (data) => {
      dispatch({ type: 'UPDATE_PAYROLL', payload: data });
      toast.success('Payroll record updated!');
    },
    deletePayroll: (id) => {
      dispatch({ type: 'DELETE_PAYROLL', payload: id });
      toast.success('Payroll record deleted.');
    },
    markPaid: (id) => {
      dispatch({ type: 'MARK_PAID', payload: id });
      addNotification('success', 'Payroll has been processed and marked as paid.');
      toast.success('Marked as Paid!');
    },

    // Jobs
    addJob: (data) => {
      const job = { ...data, id: generateId('JOB'), applicants: 0, postedOn: new Date().toISOString().split('T')[0] };
      dispatch({ type: 'ADD_JOB', payload: job });
      toast.success('Job opening created!');
    },
    updateJob: (data) => {
      dispatch({ type: 'UPDATE_JOB', payload: data });
      toast.success('Job updated!');
    },
    deleteJob: (id) => {
      dispatch({ type: 'DELETE_JOB', payload: id });
      toast.success('Job deleted.');
    },
    toggleJobStatus: (id) => {
      dispatch({ type: 'TOGGLE_JOB_STATUS', payload: id });
      toast.success('Job status updated!');
    },

    // Candidates
    addCandidate: (data) => {
      const cnd = { ...data, id: generateId('CND'), status: 'Applied', appliedOn: new Date().toISOString().split('T')[0], avatar: `https://i.pravatar.cc/150?u=${generateId()}` };
      dispatch({ type: 'ADD_CANDIDATE', payload: cnd });
      // Increment applicants count
      const job = state.jobs.find(j => j.id === data.jobId);
      if (job) dispatch({ type: 'UPDATE_JOB', payload: { ...job, applicants: job.applicants + 1 } });
      toast.success('Candidate added!');
    },
    updateCandidate: (data) => {
      dispatch({ type: 'UPDATE_CANDIDATE', payload: data });
      toast.success('Candidate status updated!');
    },
    deleteCandidate: (id) => {
      dispatch({ type: 'DELETE_CANDIDATE', payload: id });
      toast.success('Candidate removed.');
    },
    hireCandidate: (candidateId, jobTitle, department) => {
      const candidate = state.candidates.find(c => c.id === candidateId);
      if (candidate) {
        const newEmployee = {
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          role: jobTitle,
          department: department,
          status: 'Active',
          joinDate: new Date().toISOString().split('T')[0],
          salary: 0,
          gender: 'Not Specified',
          birthday: '2000-01-01',
        };
        
        // Add as employee
        const emp = { ...newEmployee, id: generateEmployeeId(state.employees), avatar: candidate.avatar || `https://i.pravatar.cc/150?u=${generateId()}` };
        dispatch({ type: 'ADD_EMPLOYEE', payload: emp });
        
        // Update candidate status
        dispatch({ type: 'UPDATE_CANDIDATE', payload: { ...candidate, status: 'Hired' } });
        
        addNotification('success', `Candidate ${candidate.name} has been hired as ${jobTitle}.`);
        toast.success(`${candidate.name} hired successfully!`);
      }
    },

    // Performance
    addPerformance: (data) => {
      const perf = { ...data, id: generateId('PRF'), score: parseFloat(data.score), rating: getRatingLabel(parseFloat(data.score)), reviewedBy: 'Admin', reviewedOn: new Date().toISOString().split('T')[0] };
      dispatch({ type: 'ADD_PERFORMANCE', payload: perf });
      toast.success('Performance review added!');
    },
    updatePerformance: (data) => {
      const upd = { ...data, score: parseFloat(data.score), rating: getRatingLabel(parseFloat(data.score)) };
      dispatch({ type: 'UPDATE_PERFORMANCE', payload: upd });
      toast.success('Review updated!');
    },
    deletePerformance: (id) => {
      dispatch({ type: 'DELETE_PERFORMANCE', payload: id });
      toast.success('Review deleted.');
    },

    // Training
    addTraining: (data) => {
      const trn = { ...data, id: generateId('TRN'), enrolledEmployees: [] };
      dispatch({ type: 'ADD_TRAINING', payload: trn });
      toast.success('Training program added!');
    },
    updateTraining: (data) => {
      dispatch({ type: 'UPDATE_TRAINING', payload: data });
      toast.success('Training updated!');
    },
    deleteTraining: (id) => {
      dispatch({ type: 'DELETE_TRAINING', payload: id });
      toast.success('Training deleted.');
    },
    assignEmployeesToTraining: (trainingId, employeeIds) => {
      const trn = state.training.find(t => t.id === trainingId);
      if (trn) {
        const merged = [...new Set([...trn.enrolledEmployees, ...employeeIds])];
        dispatch({ type: 'UPDATE_TRAINING', payload: { ...trn, enrolledEmployees: merged } });
        toast.success('Employees assigned to training!');
      }
    },

    // Notifications
    addNotification,
    markNotificationRead: (id) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),
    markAllRead: () => dispatch({ type: 'MARK_ALL_READ' }),

    // Messages
    sendMessage: (text) => {
      const msg = { id: generateId('MSG'), sender: 'Admin', avatar: 'https://i.pravatar.cc/150?u=admin', message: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isAdmin: true };
      dispatch({ type: 'ADD_MESSAGE', payload: msg });
    },

    // Profile
    updateProfile: (data) => {
      dispatch({ type: 'UPDATE_PROFILE', payload: data });
      toast.success('Profile updated successfully!');
    },

    // Confirmation Dialog
    confirmAction: (config) => {
      dispatch({ type: 'SHOW_CONFIRM', payload: config });
    },
    hideConfirm: () => {
      dispatch({ type: 'HIDE_CONFIRM' });
    },

    // Clear all data (logout)
    clearAll: () => {
      dispatch({ type: 'CLEAR_ALL' });
    },
  };

  return (
    <AppContext.Provider value={{ state, kpis, ...actions }}>
      {children}
    </AppContext.Provider>
  );
};

// ─── Custom Hook ───────────────────────────────────────────────────────────────
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export default AppContext;
