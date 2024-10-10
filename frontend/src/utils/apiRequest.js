import axios from "axios";

const host = "https://zenzone.onrender.com";
// const host = 'http://localhost:5000';
const API_BASE_URL = `${host}/api/v1`;

// API request function
const apiRequest = async (url, method, data = null) => {
  const token = localStorage.getItem("token");

  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data ? data : null,
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error("API Request Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

// API functions
export const registerAPI = (data) =>
  apiRequest(`${API_BASE_URL}/user/register`, "POST", data);
export const loginAPI = (data) =>
  apiRequest(`${API_BASE_URL}/user/login`, "POST", data);

export const addSleepEntryAPI = (data) =>
  apiRequest(`${API_BASE_URL}/sleep`, "POST", data);
export const getUserSleepAPI = () =>
  apiRequest(`${API_BASE_URL}/sleep/user`, "GET");
export const getSleepByIdAPI = (id) =>
  apiRequest(`${API_BASE_URL}/sleep/${id}`, "GET");
export const updateSleepEntryAPI = (id, data) =>
  apiRequest(`${API_BASE_URL}/sleep/${id}`, "PUT", data);
export const deleteSleepEntryAPI = (id) =>
  apiRequest(`${API_BASE_URL}/sleep/${id}`, "DELETE");

export const addMoodEntryAPI = (data) =>
  apiRequest(`${API_BASE_URL}/mood`, "POST", data);
export const getUserMoodAPI = () => apiRequest(`${API_BASE_URL}/mood`, "GET");
export const getMoodByIdAPI = (id) =>
  apiRequest(`${API_BASE_URL}/mood/${id}`, "GET");
export const updateMoodEntryAPI = (id, data) =>
  apiRequest(`${API_BASE_URL}/mood/${id}`, "PUT", data);
export const deleteMoodEntryAPI = (id) =>
  apiRequest(`${API_BASE_URL}/mood/${id}`, "DELETE");

export const createPostAPI = (data) =>
  apiRequest(`${API_BASE_URL}/post`, "POST", data);
export const getAllPostsAPI = () => apiRequest(`${API_BASE_URL}/post`, "GET");
export const getPostByIdAPI = (id) =>
  apiRequest(`${API_BASE_URL}/post/${id}`, "GET");
export const updatePostAPI = (id, data) =>
  apiRequest(`${API_BASE_URL}/post/${id}`, "PUT", data);
export const deletePostAPI = (id) =>
  apiRequest(`${API_BASE_URL}/post/${id}`, "DELETE");
export const toggleLikePostAPI = (id) =>
  apiRequest(`${API_BASE_URL}/post/like/${id}`, "POST");
