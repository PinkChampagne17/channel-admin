import axios from "axios";
import { User, UserWithActivity } from "../types/user";

export function fetchUsers<T extends UserWithActivity>(): Promise<T[]> {
  return axios.get<T[]>("/admin/users").then((response) => response.data);
}

export function updateUser<T extends User>(user: T): Promise<T> {
  return axios.patch<T>("/admin/users", user).then((response) => response.data);
}
