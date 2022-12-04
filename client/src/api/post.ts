import axios from "axios";
import type PaginatedResponse from "@/interfaces/PaginatedResponse";
import type Post from "@/interfaces/Post";

export function fetchPosts(page: number = 1, limit: number = 10) {
  return axios.get<PaginatedResponse<Post>>("/posts", {
    params: {
      limit,
      page,
    },
  });
}

export function getPost(id: number) {
  return axios.get<Post>(`/posts/${id}`);
}

export function deletePost(id: number) {
  return axios.delete(`/posts/${id}`);
}

export function editPost(id: number, data: Omit<Post, "id" | "user">) {
  return axios.patch(`/posts/${id}`, data);
}

export function createPost(data: Omit<Post, "id" | "user">) {
  return axios.post<Post>("/posts", data);
}
