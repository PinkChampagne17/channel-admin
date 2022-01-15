import { useQuery } from "react-query";
import { fetchUsers } from "../api/users";

export function useQueryUsers() {
  return useQuery(fetchUsers.name, fetchUsers);
}
