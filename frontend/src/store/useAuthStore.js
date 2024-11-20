import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(`Error in checkAuth : `, error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    try {
      set({ isRegistering: true });
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
    } catch (error) {
      console.log("error in register : ", error);
      set({ authUser: null });
      toast.error("Failed to Create Account");
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
    } catch (error) {
      console.log("error in login : ", error);
      set({ authUser: null });
      toast.error("Failed to Login");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.log("error in logout : ", error);
      toast.error("Failed to Logout");
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (profilePic) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.post("/auth/update-profile", profilePic);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Error in updating profile : ", error);
      toast.error("Failed to Update Profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
