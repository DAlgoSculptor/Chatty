import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';

// Helper function for global error handling
const handleError = (error) => {
  console.error("API Error:", error);

  const errorMessage =
    error.response?.data?.message || "Something went wrong, please try again.";

  toast.error(errorMessage);
};

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("authToken"); // Check if there's an existing token
      if (!token) return set({ authUser: null, isCheckingAuth: false });

      const res = await axiosInstance.get("/auth/check", {
        headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
      });
      set({ authUser: res.data });
    } catch (error) {
      handleError(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("authToken", res.data.token); // Store JWT token in localStorage
      toast.success("Account created successfully");
    } catch (error) {
      handleError(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("authToken", res.data.token); // Store JWT token in localStorage
      toast.success("Logged in successfully");
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("authToken"); // Clear JWT token from localStorage
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      handleError(error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      handleError(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
