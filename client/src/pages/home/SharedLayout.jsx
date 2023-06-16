import { Box } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { Header, SideNav } from "../../components";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Box sx={styles.container}>
        <SideNav />
        <Box component={"main"} sx={styles.mainSection}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

/** @type {import("@mui/material").SxProps}*/
const styles = {
  container: {
    display: "flex",
    height: "calc(100% - 64px)"
  },
  mainSection: {
    p: 4,
    width: "100%",
    height: "100%",
    backgroundColor: "#f9f9f9"
  }
};
export default SharedLayout;
