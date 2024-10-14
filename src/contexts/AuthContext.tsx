import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

interface AuthContextType {
  user: { id: string; fullName: string; email: string; role: string } | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    id: string;
    fullName: string;
    email: string;
    role: string;
  } | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3001/users");
    const users = await response.json();
    const foundUser = users.find(
      (u: { email: string; password: string; role: string }) =>
        u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      toast.success("Login successful");
    } else {
      toast.error("Invalid credentials");
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    role: string
  ) => {
    const newUser = { fullName, email, password, role };

    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const createdUser = await response.json();
      setUser(createdUser);
      localStorage.setItem("user", JSON.stringify(createdUser));
      toast.success("Signup successful");
    } else {
      toast.error("Signup failed");
      throw new Error("Signup failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
