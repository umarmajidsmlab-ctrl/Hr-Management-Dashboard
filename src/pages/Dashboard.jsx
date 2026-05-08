import React from 'react';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  UserPlus, 
  LogOut, 
  TrendingUp,
  Cake,
  ChevronRight
} from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { state, kpis } = useApp();
  const navigate = useNavigate();

  // ─── Data Prep for Charts ─────────────────────────────────────────
  const lineChartData = {
    labels: state.attendanceTrend.map(d => d.date),
    datasets: [
      {
        label: 'Present',
        data: state.attendanceTrend.map(d => d.present),
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Absent',
        data: state.attendanceTrend.map(d => d.absent),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const deptCounts = state.employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const departmentData = Object.keys(deptCounts).map((key, i) => {
    const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return { name: key, count: deptCounts[key], color: colors[i % colors.length] };
  }).sort((a, b) => b.count - a.count);

  const donutChartData = {
    labels: departmentData.map(d => d.name),
    datasets: [
      {
        data: departmentData.map(d => d.count),
        backgroundColor: departmentData.map(d => d.color),
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12 }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // ─── Birthdays ──────────────────────────────────────────────────
  const getUpcomingBirthdays = () => {
    // A simplified approach for upcoming birthdays.
    return state.employees
      .filter(e => e.birthday)
      .slice(0, 3); // Mocking upcoming logic by taking first 3 with birthdays.
  };

  const handleWishAll = () => {
    const birthdays = getUpcomingBirthdays();
    if (birthdays.length === 0) {
      toast.error('No upcoming birthdays to wish!');
      return;
    }
    toast.success(`Birthday wishes sent to ${birthdays.length} employees!`);
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Dashboard</h4>
          <p className="text-muted small mb-0">Welcome back, {state.profile?.firstName || 'Admin'}! Here's what's happening today.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" onClick={() => navigate('/reports')}>
          <TrendingUp size={18} />
          <span>Export Report</span>
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl">
          <StatCard 
            title="Total Employees" 
            value={kpis.total} 
            icon={<Users size={24} />} 
            trend="Active" 
            color="#4f46e5" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl">
          <StatCard 
            title="Present Today" 
            value={kpis.active} 
            icon={<UserCheck size={24} />} 
            trend="Logged in" 
            color="#10b981" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl">
          <StatCard 
            title="On Leave" 
            value={kpis.onLeave} 
            icon={<LogOut size={24} />} 
            trend="Away" 
            color="#f59e0b" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl">
          <StatCard 
            title="Open Jobs" 
            value={kpis.openJobs} 
            icon={<UserPlus size={24} />} 
            trend="Recruiting" 
            color="#0ea5e9" 
          />
        </div>
        <div className="col-12 col-sm-6 col-xl">
          <StatCard 
            title="Pending Leaves" 
            value={kpis.pending} 
            icon={<UserMinus size={24} />} 
            trend="Requires action" 
            color="#ef4444" 
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Attendance Overview</h6>
              <select className="form-select form-select-sm w-auto border-0 bg-light">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div style={{ height: '300px' }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card h-100 p-4">
            <h6 className="fw-bold mb-4">Department Wise Employees</h6>
            <div style={{ height: '250px' }}>
              {departmentData.length > 0 ? (
                 <Doughnut data={donutChartData} options={{ ...chartOptions, scales: {} }} />
              ) : (
                 <p className="text-center text-muted">No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0">Recent Joiners</h6>
              <button className="btn btn-link btn-sm text-decoration-none p-0" onClick={() => navigate('/employees')}>View All</button>
            </div>
            <div className="list-group list-group-flush">
              {state.employees.slice(0, 5).map(emp => (
                <div key={emp.id} className="list-group-item px-0 py-3 border-0 d-flex align-items-center justify-content-between" style={{cursor: 'pointer'}} onClick={() => navigate(`/employees/${emp.id}`)}>
                  <div className="d-flex align-items-center">
                    <img src={emp.avatar} alt={emp.name} className="rounded-circle me-3" width="40" height="40" style={{objectFit: 'cover'}}/>
                    <div>
                      <p className="mb-0 fw-bold small">{emp.name}</p>
                      <p className="mb-0 text-muted x-small text-truncate" style={{maxWidth: '120px'}}>{emp.role}</p>
                    </div>
                  </div>
                  <p className="mb-0 text-muted small text-nowrap">{formatDate(emp.joinDate)}</p>
                </div>
              ))}
              {state.employees.length === 0 && <p className="text-muted small">No employees found.</p>}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card p-4">
            <h6 className="fw-bold mb-4">Top Departments</h6>
            {departmentData.map((dept, index) => (
              <div key={index} className="mb-4 last-child-mb-0">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-bold">{dept.name}</span>
                  <span className="small text-muted">{dept.count} Employees</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar rounded-pill" 
                    role="progressbar" 
                    style={{ width: `${(dept.count / kpis.total) * 100}%`, backgroundColor: dept.color }}
                  ></div>
                </div>
              </div>
            ))}
            {departmentData.length === 0 && <p className="text-muted small">No departments data.</p>}
          </div>
        </div>

        <div className="col-12 col-md-12 col-lg-4">
          <div className="card p-4 h-100">
            <h6 className="fw-bold mb-4">Upcoming Birthdays</h6>
            <div className="list-group list-group-flush">
              {getUpcomingBirthdays().map((emp, index) => (
                <div key={index} className="list-group-item px-0 py-3 border-0 d-flex align-items-center">
                  <div className="position-relative me-3">
                    <img src={emp.avatar} alt={emp.name} className="rounded-circle" width="40" height="40" style={{objectFit: 'cover'}} />
                    <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '20px', height: '20px', border: '2px solid white' }}>
                      <Cake size={10} color="white" />
                    </div>
                  </div>
                  <div>
                    <p className="mb-0 fw-bold small">{emp.name}</p>
                    <p className="mb-0 text-muted x-small">Upcoming</p>
                  </div>
                  <div className="ms-auto">
                    <span className="badge bg-light text-dark fw-normal small">{formatDate(emp.birthday)}</span>
                  </div>
                </div>
              ))}
              {getUpcomingBirthdays().length === 0 && <p className="text-muted small">No upcoming birthdays.</p>}
            </div>
            <button className="btn btn-outline-primary btn-sm mt-4 w-100" onClick={handleWishAll}>Wish All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
