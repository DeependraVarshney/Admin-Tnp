// routes/AppRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { USER_ROLES, ROUTES } from '../constants';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      
      {/* Admin Routes */}
      <Route
        path={ROUTES.ADMIN_DASHBOARD}
        element={
          <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* TPO Routes */}
      <Route
        path={ROUTES.TPO_DASHBOARD}
        element={
          <ProtectedRoute requiredRole={USER_ROLES.TPO}>
            <TPODashboard />
          </ProtectedRoute>
        }
      />

      {/* Company Routes */}
      <Route
        path={ROUTES.COMPANY_DASHBOARD}
        element={
          <ProtectedRoute requiredRole={USER_ROLES.COMPANY}>
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path={ROUTES.STUDENT_DASHBOARD}
        element={
          <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Error Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

