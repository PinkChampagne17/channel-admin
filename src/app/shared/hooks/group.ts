import { fetchGroups } from "../api/groups";
import { useQueryWithFunctionName } from "./common";

export function useQueryGroups() {
  return useQueryWithFunctionName(fetchGroups);
}
