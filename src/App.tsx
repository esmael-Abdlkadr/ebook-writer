import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster, ToastOptions } from "react-hot-toast";
import Signup from "./page/Signup";
import { AuthProvider } from "./context/AuthContext";

import LogInForm from "./page/Login";
import { SectionsProvider } from "./context/SectionContext";
import Layout from "./page/Layout";
import Admin from "./page/Admin";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./page/Home";

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
