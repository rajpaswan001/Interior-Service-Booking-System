
import { createContext, useContext, useState } from "react";
import { API_URL } from "../config/api";

// Login state share karne ke liye context
const AuthContext = createContext(null);

// App ke components ko login state provide karega
export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);

  // Login hone par customer data save karega
  function login(customerData) {
    setCustomer(customerData);
  }

  // Backend aur frontend dono se logout karega
  async function logout() {
    try {
      const response = await fetch(
        `${API_URL}/customers/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Backend logout failed");
      }

      // Backend logout successful hone par frontend state clear
      setCustomer(null);

    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ customer, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Kisi bhi component mein login state use karne ka helper
export function useAuth() {
  return useContext(AuthContext);
}
