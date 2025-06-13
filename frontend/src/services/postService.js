import axios from "axios";



const postService = {
  getAllPosts: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createMultiplePosts: async (posts) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/posts/multiple`, posts);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // searchPosts: async (prompt) => {
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/search`, {
  //       params: { prompt },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error.message;
  //   }
  // },
};

export default postService;
