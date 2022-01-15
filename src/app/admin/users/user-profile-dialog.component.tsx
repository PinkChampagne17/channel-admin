import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Formik } from "formik";
import _ from "lodash";
import { User, userValidationSchema } from "../../shared/types/user";
import { updateUser } from "../../shared/api/users";
import { getAvatarURL } from "../../shared/api/chat";
import { Fields } from "../../shared/components/fields/fields.component";
import { Field } from "../../shared/components/fields/types";

const formFields: Array<Field<User>> = [
  { type: "text", label: "ID", name: "id", readonly: true },
  { type: "email", label: "电子邮件", name: "email", readonly: true },
  { type: "text", label: "用户名", name: "link" },
  { type: "text", label: "名称", name: "name" },
  { type: "text", label: "简介", name: "bio" },
  {
    type: "text",
    label: "GitHub 用户名",
    name: "githubUsername",
    readonly: true,
  },
  // { type: "text", label: "注册时间", name: "createAt", readonly: true },
  // { type: "text", label: "资料更新时间", name: "updateAt", readonly: true },
];

interface Props {
  open: boolean;
  user: User;
  handleClose: () => void;
}

export function UserProfileDialog({ open, user, handleClose }: Props) {
  async function onSubmit(values: User) {
    if (!_.isEqual(user, values)) {
      await updateUser(values);
    }
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={user}
        onSubmit={onSubmit}
        validationSchema={userValidationSchema}
      >
        {(formik) => {
          const {
            handleSubmit,
            values: { id, name },
          } = formik;
          return (
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              <DialogTitle>用户信息</DialogTitle>
              <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  alt={`${name}'s avatar`}
                  src={getAvatarURL(id)}
                  sx={{ width: 150, height: 150 }}
                />
              </DialogContent>
              <DialogContent>
                <Fields fields={formFields} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">修改</Button>
              </DialogActions>
            </Box>
          );
        }}
      </Formik>
    </Dialog>
  );
}
