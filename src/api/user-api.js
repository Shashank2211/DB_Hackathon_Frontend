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

export const addToWatchlist = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/addToWatchlist/`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getAllTradeByWatchList = async () => {
  try {
    const response = await axiosInstance.get(`/api/getAllTradeByWatchList/`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteFromWatchlist = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/deleteFromWatchlist/`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getAllSecurities = async () => {
  try {
    const response = await axiosInstance.get(`/api/getAllSecurities/`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const dashboard = async () => {
  try {
    const response = await axiosInstance.get(`/api/dashboard/`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const searchRelatedSecutity = async (searchQuery) => {
  try {
    const response = await axiosInstance.post(`/api/searchRelatedSecutity/`, {
      searchQuery: searchQuery,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
