
import { useState } from "react";

import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Button,
  Switch,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import DashboardIcon from "@mui/icons-material/Dashboard";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import GroupsIcon from "@mui/icons-material/Groups";

import WarningIcon from "@mui/icons-material/Warning";

import GavelIcon from "@mui/icons-material/Gavel";

import AssessmentIcon from "@mui/icons-material/Assessment";

import PersonIcon from "@mui/icons-material/Person";

import LogoutIcon from "@mui/icons-material/Logout";

import Footer from "../components/Footer";

const drawerWidth = 220;

function MainLayout({
  darkMode,
  setDarkMode,
}) {

  const navigate = useNavigate();

  // Role
  const role =
    localStorage.getItem("role");

  // Notification Menu State
  const [anchorEl, setAnchorEl] =
    useState(null);

  const open = Boolean(anchorEl);

  // Open Notification Menu
  const handleNotificationClick = (
    event
  ) => {

    setAnchorEl(
      event.currentTarget
    );

  };

  // Close Notification Menu
  const handleClose = () => {

    setAnchorEl(null);

  };

  // Logout
  const handleLogout = () => {

    localStorage.removeItem(
      "isAuthenticated"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );

    navigate("/");

  };

  return (

    <Box sx={{ display: "flex" }}>

      {/* HEADER */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
        }}
      >

        <Toolbar>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            e-GRCP Platform
          </Typography>

          {/* Space */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Dark Mode */}
          <Switch
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />

          {/* Notification Button */}
          <IconButton
            color="inherit"
            onClick={
              handleNotificationClick
            }
          >

            <Badge
              badgeContent={3}
              color="error"
            >

              <NotificationsIcon />

            </Badge>

          </IconButton>

          {/* Notification Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >

            <MenuItem
              onClick={handleClose}
            >
              2 New Procurement Requests
            </MenuItem>

            <MenuItem
              onClick={handleClose}
            >
              1 Vendor Pending Approval
            </MenuItem>

            <MenuItem
              onClick={handleClose}
            >
              Risk Report Generated
            </MenuItem>

          </Menu>

          {/* Logout */}
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Toolbar>

      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,

          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight:
              "1px solid #ddd",
          },
        }}
      >

        <Toolbar />

        <Box sx={{ mt: 2 }}>

          <List>

            {/* Dashboard */}
            <ListItemButton
              component={Link}
              to="/dashboard"
            >

              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>

              <ListItemText
                primary="Dashboard"
              />

            </ListItemButton>

            {/* Procurement */}
            <ListItemButton
              component={Link}
              to="/procurement"
            >

              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>

              <ListItemText
                primary="Procurement"
              />

            </ListItemButton>

            {/* Vendors */}
            {role === "admin" && (

              <ListItemButton
                component={Link}
                to="/vendors"
              >

                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Vendors"
                />

              </ListItemButton>

            )}

            {/* Risk */}
            <ListItemButton
              component={Link}
              to="/risk"
            >

              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>

              <ListItemText
                primary="Risk"
              />

            </ListItemButton>

            {/* Compliance */}
            <ListItemButton
              component={Link}
              to="/compliance"
            >

              <ListItemIcon>
                <GavelIcon />
              </ListItemIcon>

              <ListItemText
                primary="Compliance"
              />

            </ListItemButton>

            {/* Reports */}
            <ListItemButton
              component={Link}
              to="/reports"
            >

              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>

              <ListItemText
                primary="Reports"
              />

            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            {/* Profile */}
            <ListItemButton
              component={Link}
              to="/profile"
            >

              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>

              <ListItemText
                primary="Profile"
              />

            </ListItemButton>

          </List>

        </Box>

      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <Toolbar />

        <Box
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >

          <Outlet />

        </Box>

        {/* Footer */}
        <Footer />

      </Box>

    </Box>
  );
}

export default MainLayout;
