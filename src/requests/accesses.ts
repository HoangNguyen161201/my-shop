import { productResponse } from "@/types/product";
import axios from "axios";

export const getAccess = async () => {
  try {
    const response = await axios.get(`/api/access`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};

export const updateAccess = async () => {
  try {
    const response = await axios.post(`/api/access`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};
