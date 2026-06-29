import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import {
  useState,
} from "react";

import { toast }
from "react-toastify";

function ProfilePage() {

  const [
    profile,
    setProfile,
  ] = useState({
    name: "Admin User",
    email:
      "admin@egrcp.com",
    role: "Administrator",
  });

  const handleChange = (
    e
  ) => {

    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSave = () => {

    toast.success(
      "Profile Updated Successfully"
    );

  };

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Profile
      </Typography>

      <Grid
        container
        justifyContent="center"
      >

        <Grid
          item
          xs={12}
          md={6}
        >

          <Card>

            <CardContent>

              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    "column",
                  alignItems:
                    "center",
                  mb: 3,
                }}
              >

                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    fontSize: 40,
                  }}
                >
                  A
                </Avatar>

                <Typography variant="h5">
                  Admin User
                </Typography>

              </Box>

              <TextField
                fullWidth
                label="Name"
                name="name"
                value={profile.name}
                onChange={
                  handleChange
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={profile.email}
                onChange={
                  handleChange
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Role"
                name="role"
                value={profile.role}
                onChange={
                  handleChange
                }
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={
                  handleSave
                }
              >
                Save Profile
              </Button>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Box>

  );
}

export default ProfilePage;