import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js'
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

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

}));

