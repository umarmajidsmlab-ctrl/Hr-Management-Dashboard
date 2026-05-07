import React from 'react';

const StatCard = ({ title, value, icon, trend, color }) => {
  return (
    <div className="card h-100 kpi-card">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <p className="text-muted small fw-bold mb-1">{title}</p>
          <h3 className="fw-bold mb-1">{value}</h3>
          {trend && (
            <p className={`small mb-0 ${trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>
              {trend} <span className="text-muted ms-1">this month</span>
            </p>
          )}
        </div>
        <div className="kpi-icon" style={{ backgroundColor: `${color}15`, color: color }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
