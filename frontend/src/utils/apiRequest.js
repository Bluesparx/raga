const host = import.meta.env.REACT_APP_API_HOST || "http://localhost:5000";
const API_BASE_URL = `${host}/api/v1`;

// API request function
const apiRequest = async (url, method, body = null) => {
  const token = localStorage.getItem('token');

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    credentials: 'include', 
    body: body ? JSON.stringify(body) : null
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || "Unknown error"}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error; 
  }
};

// API functions
export const registerAPI = (data) => apiRequest(`${API_BASE_URL}/user/register`, 'POST', data);
export const loginAPI = (data) => apiRequest(`${API_BASE_URL}/user/login`, 'POST', data);

export const addSleepEntryAPI = (data) => apiRequest(`${API_BASE_URL}/sleep/createSleep`, 'POST', data);
export const getUserSleepAPI = () => apiRequest(`${API_BASE_URL}/sleep/getUserSleep`, 'GET');
export const getSleepByIdAPI = (id) => apiRequest(`${API_BASE_URL}/sleep/getSleepById/${id}`, 'GET');
export const updateSleepEntryAPI = (id, data) => apiRequest(`${API_BASE_URL}/sleep/updateSleep/${id}`, 'PUT', data);
export const deleteSleepEntryAPI = (id) => apiRequest(`${API_BASE_URL}/sleep/deleteSleep/${id}`, 'DELETE');

export const addMoodEntryAPI = (data) => apiRequest(`${API_BASE_URL}/mood`, 'POST', data); 
export const getUserMoodAPI = () => apiRequest(`${API_BASE_URL}/mood/user`, 'GET'); 
export const getMoodByIdAPI = (id) => apiRequest(`${API_BASE_URL}/mood/${id}`, 'GET'); 
export const updateMoodEntryAPI = (id, data) => apiRequest(`${API_BASE_URL}/mood/${id}`, 'PUT', data);
export const deleteMoodEntryAPI = (id) => apiRequest(`${API_BASE_URL}/mood/${id}`, 'DELETE');

export const createPostAPI = (data) => apiRequest(`${API_BASE_URL}/post`, 'POST', data);
export const getAllPostsAPI = () => apiRequest(`${API_BASE_URL}/post`, 'GET');
export const getPostByIdAPI = (id) => apiRequest(`${API_BASE_URL}/post/${id}`, 'GET');
export const updatePostAPI = (id, data) => apiRequest(`${API_BASE_URL}/post/${id}`, 'PUT', data);
export const deletePostAPI = (id) => apiRequest(`${API_BASE_URL}/post/${id}`, 'DELETE');
export const toggleLikePostAPI = (id) => apiRequest(`${API_BASE_URL}/post/like/${id}`, 'POST');
