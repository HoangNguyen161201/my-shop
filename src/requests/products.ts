import { productResponse } from "@/types/product";
import axios from "axios";

export const getProducts = async ({ pageParam = 1, search = "" }) => {
  try {
    const response = await axios.get(`/api/products?page=${pageParam}&limit=12&search=${search}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};



export const createProduct = async (data: productResponse) => {
  try {
    const response = await axios.post(`/api/products/create`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};


