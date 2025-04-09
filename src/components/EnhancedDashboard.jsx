import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './EnhancedDashboard.css';

const EnhancedDashboard = () => {
  const [attendanceData, setAttendanceData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Weekly Attendance',
      data: [85, 79, 92, 88, 95],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  });

  const [departmentData] = useState({
    labels: ['HR', 'Engineering', 'Marketing', 'Sales'],
    datasets: [{
      data: [30, 50, 20, 40],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ]
    }]
  });

  // Animation for stats counter
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);

  useEffect(() => {
    const targetPresent = 87;
    const targetAbsent = 5;
    const targetLate = 8;
    
    const presentInterval = setInterval(() => {
      setPresentCount(prev => prev < targetPresent ? prev + 1 : prev);
    }, 20);

    const absentInterval = setInterval(() => {
      setAbsentCount(prev => prev < targetAbsent ? prev + 1 : prev);
    }, 100);

    const lateInterval = setInterval(() => {
      setLateCount(prev => prev < targetLate ? prev + 1 : prev);
    }, 50);

    return () => {
      clearInterval(presentInterval);
      clearInterval(absentInterval);
      clearInterval(lateInterval);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Attendance Analytics Dashboard</h1>
          <p>Real-time insights and beautiful visualizations</p>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" 
               alt="Team meeting" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card present">
          <h3>Present</h3>
          <div className="stat-value">{presentCount}%</div>
          <div className="stat-trend up">↑ 2% from last week</div>
        </div>
        
        <div className="stat-card absent">
          <h3>Absent</h3>
          <div className="stat-value">{absentCount}%</div>
          <div className="stat-trend down">↓ 1% from last week</div>
        </div>
        
        <div className="stat-card late">
          <h3>Late Arrivals</h3>
          <div className="stat-value">{lateCount}%</div>
          <div className="stat-trend neutral">→ Same as last week</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Weekly Attendance Trend</h3>
          <div className="chart-container">
            <Bar 
              data={attendanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }}
            />
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Attendance by Department</h3>
          <div className="chart-container">
            <Pie 
              data={departmentData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h3>Recent Attendance Updates</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-avatar">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
            </div>
            <div className="activity-details">
              <div className="activity-name">Sarah Johnson</div>
              <div className="activity-time">Today, 9:15 AM</div>
              <div className="activity-status present">Present</div>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-avatar">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            </div>
            <div className="activity-details">
              <div className="activity-name">Michael Chen</div>
              <div className="activity-time">Today, 9:30 AM</div>
              <div className="activity-status late">Late (15 mins)</div>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-avatar">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
            </div>
            <div className="activity-details">
              <div className="activity-name">Emily Wilson</div>
              <div className="activity-time">Today, 8:45 AM</div>
              <div className="activity-status present">Present</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
