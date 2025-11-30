// src/pages/AdminPage.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import DashboardContent from '../components/admin/DashboardContent';
import StationsManagement from '../components/admin/StationsManagement';
import ChargingSessionsManagement from '../components/admin/ChargingSessionsManagement';
import UsersManagement from '../components/admin/UsersManagement';
import PaymentsManagement from '../components/admin/PaymentsManagement';
import ServicePackagesManagement from '../components/admin/ServicePackagesManagement';
import ReportsAnalytics from '../components/admin/ReportsAnalytics';
import RevenueReport from '../components/admin/RevenueReport';
import SettingsPage from '../components/admin/SettingsPage';

const AdminPage = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/stations" element={<StationsManagement />} />
        <Route path="/sessions" element={<ChargingSessionsManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/payments" element={<PaymentsManagement />} />
        <Route path="/packages" element={<ServicePackagesManagement />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/revenue" element={<RevenueReport />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPage;