// src/utils/auth.js

// Save JWT token + user info
export const login = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Remove token + user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get token
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Get user
export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Check if logged in
export const isLoggedIn = () => {
  return !!getToken();
};
