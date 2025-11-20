import api from "./api";
import { API_PATHS } from "../config/constants";

export const register = async (userData) => {
  const res = await api.post(API_PATHS.AUTH.REGISTER, userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await api.post(API_PATHS.AUTH.LOGIN, userData);
  return res.data;
};
