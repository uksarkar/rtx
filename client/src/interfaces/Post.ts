import type User from "./User";

export default interface Post {
  title: string;
  description: string;
  preview?: string;
  id: number;
  user: User;
}
