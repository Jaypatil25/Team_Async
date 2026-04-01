import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

function AuthGuardLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      Checking your session...
    </div>
  );
}

export function ProtectedRoute() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <AuthGuardLoader />;
  if (!isAuthenticated) return <Navigate to="/signin" replace state={{ from: location }} />;

  // First-time user — must complete the form before accessing dashboard
  const onboarded = localStorage.getItem(`credify-onboarded-${user?._id}`);
  if (!onboarded && location.pathname !== "/apply") {
    return <Navigate to="/apply" replace />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <AuthGuardLoader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export function LandingRoute() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <AuthGuardLoader />;
  if (isAuthenticated) {
    const done = localStorage.getItem(`credify-onboarded-${user?._id}`);
    return <Navigate to={done ? "/dashboard" : "/apply"} replace />;
  }
  return <Outlet />;
}

// Wrap the /apply route — once submitted, mark onboarding done
export function OnboardingGuard() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <AuthGuardLoader />;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <Outlet />;
}
