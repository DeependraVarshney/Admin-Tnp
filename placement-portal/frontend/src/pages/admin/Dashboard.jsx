import React from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import DashboardStats from '../../components/Admin/DashboardStats';
import AnalyticsChart from '../../components/Admin/AnalyticsChart';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <DashboardStats />
        <AnalyticsChart />
      </main>
    </div>
  );
};