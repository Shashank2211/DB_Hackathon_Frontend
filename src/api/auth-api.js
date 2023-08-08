import axiosInstance from "./axiosInstance";

export const loginApi = async (username, password) => {
  try {
    const response = await axiosInstance.post("/api/loginUser/", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
