import { Toaster } from "sonner";
import { Routes, Route, Navigate } from "react-router-dom";

// Landing pages
import Header from "./components/Landing/Layout/Header";
import Footer from "./components/Landing/Layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard pages
import Layout from "./components/Dashboard/Layout/Layout";
import Airtime from "./pages/features/Airtime";
import Data from "./pages/features/Data";
import Electricity from "./pages/features/Electricity";
import Cable from "./pages/features/Cable";
import Waec from "./pages/features/WaecRegistrationPin";

import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Wallet from "./pages/features/Wallet";
import VerifyCode from "./pages/auth/VerifyCode";
import PrivateRoute from "./Routes/PrivateRoute";
import ScrollToDashboardTop from "./components/ScrollToTop/dashboardScroll";
import TransactionsPage from "./pages/Transactions";
import Settings from "./pages/Settings";
import AuthHeader from "./pages/auth/AuthHeader";
import Onboarding from "./pages/auth/Onboarding";
import WaecRegistrationPin from "./pages/features/WaecRegistrationPin";


function App() {
  return (
    <div className="App poppins-regular">
      <Toaster position="top-right" />
      <ScrollToTop />

      <Routes>
        {/* Landing pages */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
       
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />

        {/* Auth pages */}
        <Route path="/login" element={
          <>
          <AuthHeader logoUrl="/images/logo/logo6.png" />
        <Login />
        </> } />
        <Route path="/register" element={
          <>
          <AuthHeader logoUrl="/images/logo/logo6.png"/>
          <Register />
          </>}
          />
        <Route path="/verify-otp" element={
          <>
          <Header/>
          <VerifyCode/>
          <Footer/>
          </>
        } />
        <Route path="/onboarding" element={
          <>
          <Header/>
          <Onboarding/>
          <Footer/>
          </>
        }/>
        {/* Dashboard / VTU pages */}
        {/* Protect ALL dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
                <ScrollToDashboardTop />
              <Layout>
                <Routes>
                  <Route path="" element={<Navigate to="personal/user" replace />} />
                  <Route path="airtime" element={<Airtime />} />
                  <Route path="data" element={<Data />} />
                  <Route path="electricity" element={<Electricity />} />
                  <Route path="cable" element={<Cable />} />
                  <Route path="waec" element={<WaecRegistrationPin />} />
                  <Route path="personal/user" element={<Wallet />} />
                  <Route path="transactions" element={<TransactionsPage />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <NotFound />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
