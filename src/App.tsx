import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";

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
import Utility from "./pages/vtu/Cable";
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
        <Route
          path="/personal"
          element={
            <>
              <Header />
              <Personal />
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard / VTU pages */}
        <Route
          path="/airtime"
          element={
            <Layout title="Airtime">
              <Airtime />
            </Layout>
          }
        />
        <Route
          path="/data"
          element={
            <Layout title="Data">
              <Data />
            </Layout>
          }
        />
        <Route
          path="/electricity"
          element={
            <Layout title="Electricity">
              <Electricity />
            </Layout>
          }
        />
        <Route
          path="/utility"
          element={
            <Layout title="Utility">
              <Utility />
            </Layout>
          }
        />
        <Route
          path="/waec"
          element={
            <Layout title="WAEC">
              <Waec />
            </Layout>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
