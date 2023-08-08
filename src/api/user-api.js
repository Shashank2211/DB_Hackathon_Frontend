import axiosInstance from "./axiosInstance";

export const getUserFromToken = async () => {
  try {
    const response = await axiosInstance.get("/api/getUserFromToken/");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getUserBooks = async () => {
  try {
    const response = await axiosInstance.get("/api/getUserBooks/");
    return response.data;
  } catch (error) {
    return error.response;
  }
};
