import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import Login from './components/Login/Login';
import HomeAdmin from './components/Admin/Home/HomeAdmin';
import AdminCreateProject from './components/Admin/Home/AdminCreateProject';
import CreateNewAgency from './components/Admin/Home/CreateNewAgency';
import CreateNewSubAgency from './components/Admin/Home/CreateNewSubAgency';
import CreateNewSubInvestigator from './components/Admin/Home/CreateNewSubInvestigator';
import AddInvestigator from './components/Admin/Home/CreateNewInvestigator';
import ProjectDetails from './components/Admin/Project/ProjectDetails/ProjectDetails';
import AdminProfile from './components/Admin/AdminSubpart/AdminProfile';
import ChatSystem from './components/Admin/Message/ChatSystem';
import HomeInvestigator from './components/Investigator/Home/HomeInvestigator';
import InvestigatorProfile from './components/Investigator/Home/InvestigatorProfile'
import  ProjectDetailsInvestigaor from './components/Investigator/ProjectDetails/ProjectDetails';
import ChatSystemInvestigator from './components/Investigator/Message/ChatSystem';
import InvestigatorNotification from './components/Investigator/Home/InvestigatorNotification';
import AdminNotification from './components/Admin/Home/AdminNotification';
import Dashboard from './components/Investigator/Dashboard/NumberOfProject';
import ProjectState from './components/Investigator/Dashboard/test/HomePage';
import SubjectiveForm from './components/Investigator/SubjectiveForm/Subjectiveform';
import FormSteps from "./components/Investigator/SubjectiveForm/FormSteps"
import NumberOfProject from './components/Admin/Dashboard/NumberOfProject';
import AdminRegistration from './components/Common/AdminRegistration';
import HomeLanding from './components/Landing/Home';
import ChatBot from './components/Common/Chatbot'
import DynamicResourceAllocation from './components/Admin/Home/DynamicResourceAllocation';
import DownloadForm from './components/Investigator/SubjectiveForm/DownloadForm';
function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  // If user is not logged in or doesn't have the required role, redirect to login
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <div>
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeLanding />} />
      <Route path="/admin/register" element={<AdminRegistration />} />

      {/* Admin Routes (protected) */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <HomeAdmin />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/project" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <AdminCreateProject />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/agency" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <CreateNewAgency />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/sub-agency" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <CreateNewSubAgency />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/investigator" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <AddInvestigator />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create/sub-investigator" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <CreateNewSubInvestigator />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/project/details/:projectId" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <ProjectDetails />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/profile/:adminId" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <AdminProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/chat" 
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <ChatSystem />
          </ProtectedRoute>
        } 
      />

<Route
        path="/admin/notification"
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <AdminNotification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <NumberOfProject />
          </ProtectedRoute>
        }
      />

<Route
        path="/resource/allocation"
        element={
          <ProtectedRoute allowedRole="Admin Head">
            <DynamicResourceAllocation />
          </ProtectedRoute>
        }
      />



{/* ========================================================================= */}
      {/* Investigator Routes (protected) */}
      <Route 
        path="/investigator" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <HomeInvestigator />
          </ProtectedRoute>
        } 
      />
       <Route 
        path="/investigator/profile" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <InvestigatorProfile/>
          </ProtectedRoute>
        } 
      />
       <Route 
        path="/investigator/profile" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <InvestigatorProfile/>
          </ProtectedRoute>
        } 
      />


<Route 
        path="/investigator/project/details/:projectId" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <ProjectDetailsInvestigaor/>
          </ProtectedRoute>
        } 
      />

<Route 
        path="/investigator/chat" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <ChatSystemInvestigator />
          </ProtectedRoute>
        } 
      />

<Route
        path="/investigator/notification"
        element={
          <ProtectedRoute allowedRole="Investigator">
            <InvestigatorNotification />
          </ProtectedRoute>
        }
      />

<Route
        path="/investigator/dashboard"
        element={
          <ProtectedRoute allowedRole="Investigator">
            <Dashboard/>
          </ProtectedRoute>
        }
      />

<Route
        path="/investigator/project/statistics"
        element={
          <ProtectedRoute allowedRole="Investigator">
            <ProjectState/>
          </ProtectedRoute>
        }
      />

<Route
        path="/investigator/project/subjective-forms"
        element={
          <ProtectedRoute allowedRole="Investigator">
            <FormSteps/>
          </ProtectedRoute>
        }
      />

<Route
        path="/download"  
        element={
          <ProtectedRoute allowedRole="Investigator">
            <DownloadForm/>
          </ProtectedRoute>
        }
      />

<Route 
        path="/investigator/management" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <HomeInvestigator />
          </ProtectedRoute>
        } 
      />

<Route 
        path="/organization" 
        element={
          <ProtectedRoute allowedRole="Investigator">
            <HomeInvestigator />
          </ProtectedRoute>
        } 
      />

    </Routes>
    <ChatBot/>
    
    </div>
    
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
