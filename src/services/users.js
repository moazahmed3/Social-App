import api from "./api";

export const UsersAPI = {
  async getUserPosts(userId) {
    const { data } = await api.get(`users/${userId}/posts`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  },
  async uploadProfileImg(formData) {
    const { data } = await api.put(`/users/upload-photo`, formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  },
  async getProfile() {
    const { data } = await api.get(
      "https://route-posts.routemisr.com/users/profile-data",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  },
};
