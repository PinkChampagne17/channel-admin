import * as yup from "yup";
import { Chat } from "./chat";

export interface User extends Omit<Chat, "type"> {
  email: string;
  githubUsername: string | null;
}

export interface UserWithActivity extends User {
  activity: number;
}

export const userValidationSchema = yup.object({
  link: yup
    .string()
    .required("Username / link is required")
    .matches(/^[A-Za-z0-9]{1,32}$/),
  name: yup
    .string()
    .required("Name is required")
    .min(1, "Name should not to be empty")
    .max(32, "Name is too long"),
  bio: yup.string().max(128, "Bio should not to be longer than 128"),
});
