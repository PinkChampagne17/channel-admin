import {
  Link,
  Box,
  Grid,
  Paper,
  Avatar,
  Button,
  TextField,
  Typography,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { isEqual } from "lodash";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Channel
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const loginFormInitialValues = {
  email: "",
  password: "",
};

const adminIdAndPassword = {
  email: "admin@example.com",
  password: "123456",
};

const loginFormValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be of minimum 8 characters length"),
});

export function Login() {
  const theme = createTheme();
  const navigate = useNavigate();

  const [openPasswordIncorrectAlert, setOpenPasswordIncorrectAlert] =
    useState(false);

  function onSubmit(values: typeof loginFormInitialValues) {
    if (isEqual(values, adminIdAndPassword)) {
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setOpenPasswordIncorrectAlert(true);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Snackbar
          open={openPasswordIncorrectAlert}
          autoHideDuration={5000}
          sx={{ width: "97%" }}
          onClose={() => setOpenPasswordIncorrectAlert(false)}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            The Id and password you entered is incorrect.
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Formik
              initialValues={loginFormInitialValues}
              validationSchema={loginFormValidationSchema}
              onSubmit={onSubmit}
            >
              {({ touched, errors, getFieldProps, handleSubmit }) => (
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Admin ID"
                    autoComplete="email"
                    autoFocus
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    {...getFieldProps("email")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    {...getFieldProps("password")}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log in
                  </Button>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
