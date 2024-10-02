const host = process.env.REACT_APP_API_HOST || "http://localhost:5000";

export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;

export const addSleepEntryAPI = `${host}/api/v1/sleep/createSleep`;
// export const getUserSleepAPI = `${host}/api/v1/sleep/getUserSleep`;
export const getSleepByIdAPI = (id) => `${host}/api/v1/sleep/getSleepById/${id}`;
export const updateSleepEntryAPI = (id) => `${host}/api/v1/sleep/updateSleep/${id}`;
export const deleteSleepEntryAPI = (id) => `${host}/api/v1/sleep/deleteSleep/${id}`;

export const addMoodEntryAPI = `${host}/api/v1/mood/createMood`;
// export const getUserMoodAPI = `${host}/api/v1/mood/getUserMood`;
export const getMoodByIdAPI = (id) => `${host}/api/v1/mood/getMoodById/${id}`;
export const updateMoodEntryAPI = (id) => `${host}/api/v1/mood/updateMood/${id}`;
export const deleteMoodEntryAPI = (id) => `${host}/api/v1/mood/deleteMood/${id}`;

export const createPostAPI = `${host}/api/v1/post/`;
export const getAllPostsAPI = `${host}/api/v1/post/`; 
export const getPostByIdAPI = (id) => `${host}/api/v1/post/${id}`; 
export const updatePostAPI = (id) => `${host}/api/v1/post/${id}`;
export const deletePostAPI = (id) => `${host}/api/v1/post/${id}`; 
export const toggleLikePostAPI = (id) => `${host}/api/v1/post/like/${id}`;