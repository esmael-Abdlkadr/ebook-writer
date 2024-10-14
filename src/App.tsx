import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster, ToastOptions } from "react-hot-toast";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";

import LogInForm from "./pages/Login";
import { SectionsProvider } from "./contexts/SectionContext";
import Layout from "./pages/Layout";
import Admin from "./pages/Admin";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";

const toastOption: ToastOptions = {
  duration: 3000,
  style: {
    fontSize: "16px",
    maxWidth: "500px",
    padding: "16px 24px",
    backgroundColor: "#f3f3f3f3",
    color: "#333",
  },
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SectionsProvider>
          <Routes>
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={toastOption}
          />
        </SectionsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
