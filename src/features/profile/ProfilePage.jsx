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

import { useState } from "react";

import { toast } from "react-toastify";

function ProfilePage() {

  const [profile, setProfile] =
    useState({
      name: "Admin User",
      email: "admin@egrcp.com",
      role: "Administrator",
    });

  // Handle Input Change
  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });

  };

  // Save Profile
  const handleSave = () => {

    toast.success(
      "Profile Updated Successfully"
    );

  };

  return (

    <Box sx={{ p: 3 }}>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Profile
      </Typography>

      {/* Main Grid */}
      <Grid
        container
        sx={{
          justifyContent: "center",
        }}
      >

        {/* Profile Card */}
        <Grid
          xs={12}
          md={6}
        >

          <Card
            elevation={4}
            sx={{
              borderRadius: 3,
            }}
          >

            <CardContent>

              {/* Avatar Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    "column",
                  alignItems:
                    "center",
                  mb: 4,
                }}
              >

                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    fontSize: 40,
                    bgcolor:
                      "primary.main",
                  }}
                >
                  {profile.name
                    ?.charAt(0)}
                </Avatar>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight:
                      "bold",
                  }}
                >
                  {profile.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {profile.role}
                </Typography>

              </Box>

              {/* Name */}
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

              {/* Email */}
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

              {/* Role */}
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

              {/* Save Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
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