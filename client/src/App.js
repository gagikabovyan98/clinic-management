import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import RoomsPage from './pages/RoomsPage';
import CreateAppointmentPage from './pages/CreateAppointmentPage';
import AddRoomPage from './pages/AddRoomPage';
import EhrImagesPage from './pages/EhrImagesPage';


function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/staff/login" element={<Login onLogin={() => navigate('/staff/dashboard')} />} />
      <Route path="/patient/login" element={<PatientLogin onLogin={() => navigate('/patient/dashboard')} />} />

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
        path="/rooms"
        element={
          <PrivateRoute>
            <RoomsPage />
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
      <Route
        path="/appointments/create"
        element={
          <PrivateRoute role="staff">
            <CreateAppointmentPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/rooms/add"
        element={
          <PrivateRoute role="staff">
            <AddRoomPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ehr/images/:id"
        element={
          <PrivateRoute role="staff">
            <EhrImagesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ehr/images"
        element={
          <PrivateRoute role="patient">
            <EhrImagesPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
