import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  lazy,
  Suspense,
} from "react";

import LoginPage
from "../features/auth/pages/LoginPage";

import ProtectedRoute
from "./ProtectedRoute";

import MainLayout
from "../layouts/MainLayout";

// Lazy Pages
const DashboardPage = lazy(() =>
  import(
    "../features/dashboard/DashboardPage"
  )
);

const ProcurementListPage = lazy(() =>
  import(
    "../features/procurement/ProcurementListPage"
  )
);

const VendorListPage = lazy(() =>
  import(
    "../features/vendors/VendorListPage"
  )
);

const RiskPage = lazy(() =>
  import(
    "../features/risk/RiskPage"
  )
);

const CompliancePage = lazy(() =>
  import(
    "../features/compliance/CompliancePage"
  )
);

const ReportsPage = lazy(() =>
  import(
    "../features/reports/ReportsPage"
  )
);

const ProfilePage = lazy(() =>
  import(
    "../features/profile/ProfilePage"
  )
);

function AppRouter({
  darkMode,
  setDarkMode,
}) {

  return (

    <BrowserRouter>

      <Suspense
        fallback={<h2>Loading...</h2>}
      >

        <Routes>

          {/* Login */}
          <Route
            path="/"
            element={<LoginPage />}
          />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>

                <MainLayout
                  darkMode={darkMode}
                  setDarkMode={
                    setDarkMode
                  }
                />

              </ProtectedRoute>
            }
          >

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            <Route
              path="/procurement"
              element={
                <ProcurementListPage />
              }
            />

            <Route
              path="/vendors"
              element={<VendorListPage />}
            />

            <Route
              path="/risk"
              element={<RiskPage />}
            />

            <Route
              path="/compliance"
              element={
                <CompliancePage />
              }
            />

            <Route
              path="/reports"
              element={<ReportsPage />}
            />

            <Route
              path="/profile"
              element={<ProfilePage />}
            />

          </Route>

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default AppRouter;