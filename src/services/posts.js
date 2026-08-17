import api from "./api";

export const PostsAPI = {
  async fetchAllPosts() {
    const { data } = await api.get("/posts", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  },
  async fetchPostDetails(id) {
    const { data } = await api.get(`/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  },
  async createPosts(formData) {
    const { data } = await api.post("/posts", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  },
  async deletePost(id) {
    const { data } = await api.delete(`posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  },

  async updatePost(postId, formData) {
    const { data } = await api.put(`/posts/${postId}`, formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  },

  async toggleLike(postId) {
    const { data } = await api.put(
      `/posts/${postId}/like`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  },
  async toggleBookmark(postId) {
    const { data } = await api.put(
      `/posts/${postId}/bookmark`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  },
};
