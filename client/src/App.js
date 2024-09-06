import { CssBaseline } from "@mui/material";
import Layout from "Layout";
import About from "pages/About";
import Auth from "pages/Auth";
import Home from "pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "pages/Profile";
import ProtectedRoute from "utils/ProtectedRoute";
import CreateListing from "pages/CreateListing";
import UpdateListing from "pages/UpdateListing";
import Listing from "pages/Listing";

function App() {
  return (
    <>
      <CssBaseline />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/listing/:listingId" element={<Listing />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute redirect="/auth">
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/createlisting"
                element={
                  <ProtectedRoute redirect="/auth">
                    <CreateListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-listing/:listingId"
                element={
                  <ProtectedRoute redirect="/auth">
                    <UpdateListing />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
