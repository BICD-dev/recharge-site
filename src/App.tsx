import { Toaster } from "sonner";
import { Routes, Route, Navigate } from "react-router-dom";

// Landing pages
import Header from "./components/Landing/Layout/Header";
import Footer from "./components/Landing/Layout/Footer";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard pages
import Layout from "./components/Dashboard/Layout/Layout";
import Airtime from "./pages/features/Airtime";
import Data from "./pages/features/Data";
import Electricity from "./pages/features/Electricity";
import Cable from "./pages/features/Cable";
import Waec from "./pages/features/Waec";

import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Wallet from "./pages/features/Wallet";
import FundWallet from "./components/Dashboard/Wallet/FundWallet";
import VerifyCode from "./pages/auth/VerifyCode";
import PrivateRoute from "./Routes/PrivateRoute";

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
          <Header />
        <Login />
        <Footer />
        </> } />
        <Route path="/register" element={
          <>
          <Header/>
          <Register />
          <Footer/>
          </>}
          />
        <Route path="/verify-otp" element={
          <>
          <Header/>
          <VerifyCode/>
          <Footer/>
          </>
        } />
        {/* Dashboard / VTU pages */}
        {/* Protect ALL dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="" element={<Navigate to="personal/user" replace />} />
                  <Route path="personal" element={<Personal />} />
                  <Route path="airtime" element={<Airtime />} />
                  <Route path="data" element={<Data />} />
                  <Route path="electricity" element={<Electricity />} />
                  <Route path="cable" element={<Cable />} />
                  <Route path="waec" element={<Waec />} />
                  <Route path="personal/user" element={<Wallet />} />
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
