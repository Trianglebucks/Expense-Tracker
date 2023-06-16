import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { displaySidebar, logoutUser, user } = useAppContext();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={displaySidebar}>
          <FiMenu color="white" />
        </IconButton>
        <Box
          component="img"
          sx={styles.appLogo}
          src="./src/assets/atlas-logo-white.png"
        />
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body1" sx={{ margin: "10px" }}>
          Hello, {user?.name}
        </Typography>
        <IconButton onClick={logoutUser}>
          <FiLogOut color="white" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

/** @type {import("@mui/material").SxProps}*/
const styles = {
  appLogo: {
    borderRadius: 2,
    width: 80,
    ml: 2,
    cursor: "pointer"
  }
};

export default Header;
