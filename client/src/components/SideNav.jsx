import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { MdDashboard } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { useAppContext } from "../context/AppContext";

const SideNav = () => {
  const { showSidebar } = useAppContext();
  const theme = useTheme();
  const location = useLocation();
  return (
    <Sidebar
      rootStyles={{
        height: "100%",
        top: "auto !important",
        backgroundColor: "rgb(249, 249, 249, 1)"
      }}
      breakPoint="md"
      collapsed={showSidebar}
      toggled={!showSidebar}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active ? theme.palette.primary.light : undefined
            };
          }
        }}
      >
        {/* dashboard */}
        <MenuItem
          active={location.pathname === "/"}
          component={<Link to="/" />}
          icon={<MdDashboard size={20} />}
        >
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        {/* view transactions */}
        <MenuItem
          active={location.pathname === "/profile"}
          component={<Link to="/profile" />}
          icon={<AiFillProfile size={20} />}
        >
          <Typography variant="body2">View Profile</Typography>
        </MenuItem>
        {/* incomes */}
        <MenuItem
          active={location.pathname === "/incomes"}
          component={<Link to="/incomes" />}
          icon={<GiReceiveMoney size={20} />}
        >
          <Typography variant="body2">Incomes</Typography>
        </MenuItem>
        {/* expenses */}
        <MenuItem
          active={location.pathname === "/expenses"}
          component={<Link to="/expenses" />}
          icon={<GiPayMoney size={20} />}
        >
          <Typography variant="body2">Expenses</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};
export default SideNav;
