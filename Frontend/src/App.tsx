import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPasswordPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import NotFound404Paged from "./pages/notFound";
import Profile from "./pages/Profile";
import ThemeProvider from "../src/customizations/Theme";
import Layout from "../src/customizations/Layout";
import { AppWrapper } from "../src/styled/DashboardStyled";
import PaginaImpostazioni from "./pages/Settings";
import LoginPages from "./pages/LoginPages";
import Register from "./pages/RegistrationPage";
import Amici from "./pages/Amici";

function App() {
  return (
    <ThemeProvider>
      <AppWrapper>
        <Router>
          <Routes>
            {/* Pagine senza layout (login, registrazione, ecc.) */}
            <Route path="/login" element={<LoginPages />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            {/* Pagine con layout (dashboard, profilo, ecc.) */}
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/profilepage"
              element={
                <Layout>
                  <ProfilePage />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <PaginaImpostazioni />
                </Layout>
              }
            />
            <Route
              path="/profile/user/:id"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            {/* Pagina di errore */}
            <Route path="/notfound" element={<NotFound404Paged />} />
            <Route path="/amici" element={<Amici />} />
            <Route path="*" element={<LoginPages />} />
          </Routes>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
