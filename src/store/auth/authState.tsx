import axios from "axios";
import Router from "next/router";
import { create } from "zustand";
import Cookies from "js-cookie";
import { UsersType } from "@/types/users.type";

interface Users {
    logout: (token: any) => Promise<void>;
    login: (token: any) => Promise<void>;
  }

export const useAuth = create <Users>((set) => ({
  logout: async (token :any) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post(`http://127.0.0.1:3000/api/logout`).then(() => {
      Cookies.remove("token");
      Router.push("/");
    });
  },
  login: async (formData :any) => {
    await axios
      .post(`http://127.0.0.1:3000/api/login`, formData)
      .then((response) => {
        Cookies.set("token", response.data.token);

        Router.push("/categorys");
      })
      .catch((error: any) => {
        error.response.data
      });
  },
}));
