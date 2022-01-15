import { Chat } from "./chat";

export interface Group extends Omit<Chat, "type"> {}

export interface GroupWithActivity extends Group {
  activity: number;
}
