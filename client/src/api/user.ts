import axios from "axios";
import type User from "@/interfaces/User";
import type PaginatedResponse from "@/interfaces/PaginatedResponse";

export function fetchUsers(page: number = 1, limit: number = 10, q?: string) {
  return axios.get<PaginatedResponse<User>>("/users", {
    params: {
      limit,
      page,
      q,
    },
  });
}

export function getUser(id: number) {
  return axios.get<User>(`/users/${id}`);
}

export function deleteUser(id: number) {
  return axios.delete(`/users/${id}`);
}

export function editUser(id: number, data: Omit<User, "id" | "address">) {
  return axios.patch(`/users/${id}`, data);
}

export function createUser(data: Omit<User, "id" | "address">) {
  return axios.post<User>("/users", data);
}
