import { createTheme } from "@mui/material";

let theme = createTheme({
  typography: {
    link: {
      display: "block",
      cursor: "pointer"
    },
    cardTitle: {
      display: "block"
    }
  }
});

export default theme;
