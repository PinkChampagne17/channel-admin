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
import { userValidationSchema } from "../../shared/types/user";
import { getAvatarURL } from "../../shared/api/chat";
import { Fields } from "../../shared/components/fields/fields.component";
import { Field } from "../../shared/components/fields/types";
import { Group } from "../../shared/types/group";

const formFields: Array<Field<Group>> = [
  { type: "text", label: "ID", name: "id", readonly: true },
  { type: "text", label: "链接", name: "link" },
  { type: "text", label: "名称", name: "name" },
  { type: "text", label: "简介", name: "bio" },
  // { type: "text", label: "注册时间", name: "createAt", readonly: true },
  // { type: "text", label: "资料更新时间", name: "updateAt", readonly: true },
];

interface Props {
  open: boolean;
  group: Group;
  handleClose: () => void;
}

export function GroupProfileDialog({ open, group, handleClose }: Props) {
  async function onSubmit(values: Group) {
    if (!_.isEqual(group, values)) {
      // await updateUser(values);
    }
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={group}
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
              <DialogTitle>群组信息</DialogTitle>
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
