import { Fragment, useState, useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { getAvatarURL } from "../../shared/api/chat";
import { Field } from "../../shared/components/fields/types";
import { Spinner } from "../../shared/components/spinner/spinner";
import { Fields } from "../../shared/components/fields/fields.component";
import { Group, GroupWithActivity } from "../../shared/types/group";
import { useQueryGroups } from "../../shared/hooks/group";
import { GroupProfileDialog } from "./group-profile-dialog.component";

interface SearchFormValues {
  id: string;
  name: string;
  sortBy: "" | "asc" | "desc";
}

const searchFormFields: Array<Field<SearchFormValues>> = [
  {
    label: "ID",
    name: "id",
    type: "text",
  },
  {
    label: "名称",
    name: "name",
    type: "text",
  },
  {
    label: "排序",
    name: "sortBy",
    type: "select",
    options: [
      { text: "", value: "" },
      { text: "根据活跃度降序", value: "desc" },
      { text: "根据活跃度升序", value: "asc" },
    ],
  },
];

const searchFormInitValues: SearchFormValues = {
  id: "",
  name: "",
  sortBy: "",
};

const itemsPerPages = 8;

export default function Groups() {
  const { data: users, isLoading } = useQueryGroups();
  const [openDialog, setOpenDialog] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState<Group | null>(null);

  const [page, setPage] = useState(1);
  const maxPageNumber = Math.ceil((users?.length ?? 0) / itemsPerPages);
  const [searchFormValues, setSearchFormValues] =
    useState<SearchFormValues>(searchFormInitValues);

  const userToDisplay = useMemo((): GroupWithActivity[] => {
    const startIndex = (page - 1) * itemsPerPages;

    const { id, name, sortBy } = searchFormValues;
    const groupAfterFilter = users
      ?.filter((user) => user.id.includes(id) && user.name.includes(name))
      .slice(startIndex, startIndex + itemsPerPages);

    if (!groupAfterFilter) {
      return [];
    }

    switch (sortBy) {
      case "asc":
        groupAfterFilter.sort((a, b) => a.activity - b.activity);
        break;
      case "desc":
        groupAfterFilter.sort((a, b) => b.activity - a.activity);
        break;
      default:
    }

    return groupAfterFilter;
  }, [users, searchFormValues, page]);

  function handleClickOpen() {
    setOpenDialog(true);
  }

  function handleClose() {
    setOpenDialog(false);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      {groupToEdit && (
        <GroupProfileDialog
          group={groupToEdit}
          open={openDialog}
          handleClose={handleClose}
        />
      )}
      <Formik
        initialValues={searchFormInitValues}
        onSubmit={setSearchFormValues}
      >
        {({ submitForm }) => (
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            noValidate
            autoComplete="off"
            onChange={submitForm}
          >
            <Fields fields={searchFormFields} />
          </Box>
        )}
      </Formik>
      <List
        sx={{
          width: "100%",
        }}
      >
        {userToDisplay.map((user, index, arr) => {
          const { id, name, activity } = user;
          return (
            <Fragment key={id}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar alt={`${name}'s avatar`} src={getAvatarURL(id)} />
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline", marginRight: 2 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        ID: {id}
                      </Typography>
                      活跃度: {activity}
                    </>
                  }
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setGroupToEdit(user);
                    handleClickOpen();
                  }}
                >
                  查看
                </Button>
              </ListItem>
              {index !== arr.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </Fragment>
          );
        })}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={maxPageNumber}
          color="primary"
          onChange={(_, newValueOfPage) => setPage(newValueOfPage)}
        />
      </Box>
    </Box>
  );
}
