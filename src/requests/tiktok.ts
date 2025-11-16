import axios from "axios";

export const getTiktokUrls = async () => {
  try {
    const response = await axios.get(`/api/video-tiktoks`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};

export const deleteTiktokUrl = async (id: string) => {
  try {
    const response = await axios.delete(`/api/video-tiktoks/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};

export const createTiktokUrl = async (data: {url: string}) => {
  try {
    const response = await axios.post(`/api/video-tiktoks/create`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Lỗi không xác định");
    }
    throw error; // ném tiếp lỗi khác
  }
};
