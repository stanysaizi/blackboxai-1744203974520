import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Attendance from './components/attendance/Attendance';
import Employees from './components/employees/Employees';
import Reports from './components/reports/Reports';
import Admin from './components/admin/Admin';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={createBrowserRouter([
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          },
          {
            path: '/',
            element: <PrivateRoute />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: 'attendance', element: <Attendance /> },
              { path: 'employees', element: <Employees /> },
              { path: 'reports', element: <Reports /> },
              { path: 'admin', element: <Admin /> }
            ]
          }
        ])} />
      </div>
    </AuthProvider>
  );
}

export default App;
