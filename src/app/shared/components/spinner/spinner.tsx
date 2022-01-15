import { Box, CircularProgress } from "@mui/material";

export function Spinner() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
      Loading...
    </Box>
  );
}
