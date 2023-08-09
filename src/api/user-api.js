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

export const getAllTradeByBook = async (bookId) => {
  try {
    const response = await axiosInstance.post(`/api/getAllTradeByBook/`, {
      id: bookId,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const reportTrade = async (id, authority, message) => {
  try {
    const response = await axiosInstance.post(`/api/reportTrade/`, {
      id: id,
      authority: authority,
      message: message,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
