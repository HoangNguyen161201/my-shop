import axios from "axios"

export const checkEmail = async (email: string) => {
  try {
    const response = await axios.post('/api/check-email', { email });
    return response.data;
  } catch (error) {
    // error là AxiosError, lấy message từ error.response.data
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};