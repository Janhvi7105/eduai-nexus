import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";


// ================= 🌐 PUBLIC PAGES =================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Payment from "./pages/Payment";


// ================= 🆕 LANDING =================
import InstructorLanding from "./pages/InstructorLanding";


// ================= 🔒 PROTECTED PAGES =================
import StudentDashboard from "./pages/StudentDashboard";


// ================= 👨‍🏫 TEACHER =================
import TeacherOnboarding from "./pages/TeacherOnboarding";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherRegister from "./pages/TeacherRegister";
import CreateCourse from "./pages/CreateCourse";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherCourse from "./pages/TeacherCourse";
import TeacherNotes from "./pages/TeacherNotes";


// ================= 👨‍🎓 STUDENTS =================
import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";


// ================= 👑 ADMIN =================
import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/ManageStudents";
import ManageTeachers from "./pages/ManageTeachers";
import ManageCourses from "./pages/ManageCourses";
import PendingTeachers from "./pages/PendingTeachers";  // ✅ ADDED
import AdminProfile from "./pages/AdminProfile";  // ✅ ADDED FOR ADMIN PROFILE
import Revenue from "./pages/Revenue";

// ================= 🔔 NOTIFICATIONS =================
import Notifications from "./pages/Notifications";


// ================= 📜 CERTIFICATE =================
import Certificate from "./pages/Certificate";


// ================= 📝 MOCK TEST =================
import MockTest from "./pages/MockTest";
import AttemptMockTest from "./pages/AttemptMockTest";
import StudentMockTests from "./pages/StudentMockTests";


// ================= 🔥 COURSE BUILDER =================
import EditCourse from "./pages/EditCourse";
import CoursePlayer from "./pages/CoursePlayer";


// ================= 📚 SIDEBAR PAGES =================
import MyCourses from "./pages/MyCourses";
import Resources from "./pages/Resources";
import Notes from "./pages/Notes";
import Inbox from "./pages/Inbox";


// ================= 👤 PROFILE =================
import Profile from "./pages/Profile";


// ================= 🔐 PROTECTED ROUTE =================
import ProtectedRoute from "./components/common/ProtectedRoute";


// ================= 🎨 GLOBAL CSS =================
import "./App.css";



// ================= PAYMENT WRAPPER =================
function PaymentWrapper() {

  const location = useLocation();

  // ✅ PREVENT DIRECT ACCESS
  if (!location.state?.course) {

    return (
      <Navigate
        to="/courses"
        replace
      />
    );
  }

  return <Payment />;
}



// ================= MAIN APP =================
function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* ================================================= */}
        {/* 🌐 PUBLIC ROUTES */}
        {/* ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/become-instructor"
          element={<InstructorLanding />}
        />

        <Route
          path="/teacher-register"
          element={<TeacherRegister />}
        />


        {/* ================================================= */}
        {/* 💳 PAYMENT */}
        {/* ================================================= */}

        <Route
          path="/payment"
          element={<PaymentWrapper />}
        />


        {/* ================================================= */}
        {/* 👑 ADMIN ROUTES */}
        {/* ================================================= */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-students"
          element={
            <ProtectedRoute>
              <ManageStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-teachers"
          element={
            <ProtectedRoute>
              <ManageTeachers />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADDED PENDING TEACHERS ROUTE */}
        <Route
          path="/pending-teachers"
          element={
            <ProtectedRoute>
              <PendingTeachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-courses"
          element={
            <ProtectedRoute>
              <ManageCourses />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/revenue"
          element={
            <ProtectedRoute>
              <Revenue />
            </ProtectedRoute>
          }
        />
        
        {/* ✅ ADDED ADMIN PROFILE ROUTE */}
        <Route
          path="/admin-profile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 👨‍🎓 STUDENT COURSE PLAYER */}
        {/* ================================================= */}

        <Route
          path="/course-player/:id"
          element={
            <ProtectedRoute>
              <CoursePlayer />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 👨‍🏫 TEACHER COURSE */}
        {/* ================================================= */}

        <Route
          path="/teacher-course/:id"
          element={
            <ProtectedRoute>
              <TeacherCourse />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* ✏️ EDIT COURSE */}
        {/* ================================================= */}

        <Route
          path="/edit-course/:id"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 📝 MOCK TEST */}
        {/* ================================================= */}

        <Route
          path="/mock-tests"
          element={
            <ProtectedRoute>
              <StudentMockTests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mock-test/:courseId"
          element={
            <ProtectedRoute>
              <MockTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attempt-test/:testId"
          element={
            <ProtectedRoute>
              <AttemptMockTest />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 👨‍🎓 STUDENT ROUTES */}
        {/* ================================================= */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-profile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 👨‍🏫 TEACHER ROUTES */}
        {/* ================================================= */}

        <Route
          path="/teacher-onboarding"
          element={
            <ProtectedRoute>
              <TeacherOnboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-profile"
          element={
            <ProtectedRoute>
              <TeacherProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-notes"
          element={
            <ProtectedRoute>
              <TeacherNotes />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 🔔 NOTIFICATIONS */}
        {/* ================================================= */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 📜 CERTIFICATE */}
        {/* ================================================= */}

        <Route
          path="/certificate/:courseId"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 👤 NORMAL PROFILE */}
        {/* ================================================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ================================================= */}
        {/* 🚫 FALLBACK */}
        {/* ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;