import axios from "axios";

export const revalidateHome = async () => {
  try {
    const response = await axios.get(`/api/revalidate/home`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};