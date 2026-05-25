import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const location = useLocation();

  const token = localStorage.getItem("token");

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("User parse error:", err);
    localStorage.clear();
  }

  const isAuthenticated =
    token &&
    token !== "undefined" &&
    token !== "null" &&
    token.length > 10;

  // ===============================
  // ❌ NOT LOGGED IN
  // ===============================
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // ===============================
  // 🔥 TEACHER ONBOARDING FLOW
  // ===============================
  if (user.role === "teacher") {

    // ❌ NOT COMPLETED → FORCE ONBOARDING
    if (!user.onboardingCompleted) {
      if (location.pathname !== "/teacher-onboarding") {
        return <Navigate to="/teacher-onboarding" replace />;
      }
    }

    // ✅ COMPLETED → BLOCK ONBOARDING PAGE
    if (user.onboardingCompleted) {
      if (location.pathname === "/teacher-onboarding") {
        return <Navigate to="/teacher-dashboard" replace />;
      }
    }
  }

  // ===============================
  // ❌ ROLE MISMATCH
  // ===============================
  if (role && user.role !== role) {
    const redirectPath =
      user.role === "teacher"
        ? "/teacher-dashboard"
        : user.role === "admin"
        ? "/admin-dashboard"
        : "/student-dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  // ===============================
  // ✅ ACCESS GRANTED
  // ===============================
  return children;
}

export default ProtectedRoute;