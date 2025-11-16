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
import Airtime from "./pages/vtu/Airtime";
import Data from "./pages/vtu/Data";
import Electricity from "./pages/vtu/Electricity";
import Cable from "./pages/vtu/Cable";
import Waec from "./pages/vtu/Waec";

import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";

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
        {/* automatic redirect to personal dashboard */}
         <Route
        path="/dashboard"
        element={<Navigate to="/dashboard/personal" replace />}
      />
        <Route
          path="/dashboard/personal"
          element={
            <>
              <Layout title="Dashboard">
              <Personal />
              </Layout>
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
        <Route path="/register" element={<Register />} />

        {/* Dashboard / VTU pages */}
        <Route
          path="/dashboard/airtime"
          element={
            <Layout title="Airtime">
              <Airtime />
            </Layout>
          }
        />
        <Route
          path="/dashboard/data"
          element={
            <Layout title="Data">
              <Data />
            </Layout>
          }
        />
        <Route
          path="/dashboard/electricity"
          element={
            <Layout title="Electricity">
              <Electricity />
            </Layout>
          }
        />
        <Route
          path="/dashboard/cable"
          element={
            <Layout title="Cable">
              <Cable />
            </Layout>
          }
        />
        <Route
          path="/dashboard/waec"
          element={
            <Layout title="WAEC">
              <Waec />
            </Layout>
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
