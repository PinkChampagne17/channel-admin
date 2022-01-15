import axios from "axios";
import { GroupWithActivity } from "../types/group";

export function fetchGroups(): Promise<GroupWithActivity[]> {
  return axios
    .get<GroupWithActivity[]>("/admin/groups")
    .then((response) => response.data);
}
