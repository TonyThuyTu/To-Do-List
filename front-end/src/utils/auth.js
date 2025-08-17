// src/utils/auth.js

// Save JWT token directly
export const login = (token) => {
  localStorage.setItem("token", token);
};

// Remove token
export const logout = () => {
  localStorage.removeItem("token");
};

// Get token
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Check if logged in
export const isLoggedIn = () => {
  return !!getToken();
};
