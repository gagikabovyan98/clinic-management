import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import StaffDashboard from './pages/StaffDashboard';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

import PatientsPage from './pages/PatientsPage';
import EhrListPage from './pages/EhrListPage';
import UploadEhrImagePage from './pages/UploadEhrImagePage';
import AddPatientPage from './pages/AddPatientPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register onRegister={() => {}} />} />
        <Route path="/staff/login" element={<Login onLogin={() => {}} />} />
        <Route path="/patient/login" element={<PatientLogin />} />

        <Route
          path="/staff/dashboard"
          element={
            <PrivateRoute role="staff">
              <StaffDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <PrivateRoute role="patient">
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <PrivateRoute role="staff">
              <PatientsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/ehr"
          element={
            <PrivateRoute role="staff">
              <EhrListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/ehr/upload"
          element={
            <PrivateRoute role="staff">
              <UploadEhrImagePage />
            </PrivateRoute>
          }
        />

        <Route
        path="/patient/add"
        element={
          <PrivateRoute role="staff">
            <AddPatientPage />
          </PrivateRoute>
        }
      />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
