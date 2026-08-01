import api from "./api";

export const CommentsAPI = {
  async getComments(id) {
    const { data } = await api.get(`/posts/${id}/comments`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  },
};
