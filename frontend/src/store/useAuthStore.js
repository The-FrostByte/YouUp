import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js'
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      console.log(res.data);
      set({
        authUser: res.data,
      });
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({
        authUser: null,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  signUp: async (data) => {
    set({
      isSigningUp: true,
    });

    console.log(data)

    try {

      const res = await axiosInstance.post("/auth/signup", data);
      set({
        authUser: res.data,
      });

      toast.success("Account created successfully!");

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({
        isSigningUp: false,
      });
    }

  },

  login: async (data) => {
    set({
      isLoggingIn: true,
    });

    console.log(data)

    try {

      const res = await axiosInstance.post("/auth/login", data);
      set({
        authUser: res.data,
      });

      toast.success("Logged in successfully");

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({
        isLoggingIn: false,
      });
    }

  },

  logout: async () => {

    set({
      isLoggingOut: true,
    })

    try {
      await axiosInstance.post('auth/logout');
      set({
        authUser: null,
      })
      toast.success("Logged out Successfully");
    } catch (error) {
      toast.error("error logging out", error.message);
    } finally {
      set({
        isLoggingOut: false,
      })
    }
  },

}));

