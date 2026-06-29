import { useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { toast } from "react-toastify";

function CreateProcurementPage() {

  const [formData, setFormData] =
    useState({
      department: "",
      amount: "",
      status: "Pending",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(
      "New Procurement:",
      formData
    );

    toast.success(
      "Procurement Request Created!"
    );

    setFormData({
      department: "",
      amount: "",
      status: "Pending",
    });
  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >

      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 450,
        }}
      >

        <Typography
          variant="h4"
          gutterBottom
        >
          Create Procurement
        </Typography>

        <form
          onSubmit={handleSubmit}
        >

          <TextField
            fullWidth
            label="Department"
            name="department"
            margin="normal"
            value={
              formData.department
            }
            onChange={
              handleChange
            }
            required
          />

          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            margin="normal"
            value={
              formData.amount
            }
            onChange={
              handleChange
            }
            required
          />

          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            margin="normal"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
          >

            <MenuItem value="Pending">
              Pending
            </MenuItem>

            <MenuItem value="Approved">
              Approved
            </MenuItem>

            <MenuItem value="Rejected">
              Rejected
            </MenuItem>

          </TextField>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
            }}
          >
            Submit
          </Button>

        </form>

      </Paper>

    </Box>
  );
}

export default CreateProcurementPage;