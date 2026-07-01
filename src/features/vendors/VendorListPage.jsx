
import { useEffect, useState } from "react";

import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  TablePagination,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { toast } from "react-toastify";

import {
  fetchVendors,
  addVendor,
  updateVendor,
  deleteVendor,
} from "./vendorSlice";

function VendorListPage() {

  const dispatch = useDispatch();

  const {
    vendors = [],
    loading,
    error,
  } = useSelector(
    (state) => state.vendors || {}
  );

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(0);

  const [
    rowsPerPage,
    setRowsPerPage,
  ] = useState(5);

  const [
    openDialog,
    setOpenDialog,
  ] = useState(false);

  const [editId, setEditId] =
    useState(null);

  const [
    newVendor,
    setNewVendor,
  ] = useState({
    name: "",
    category: "",
    risk: "Low",
    status: "Active",
  });

  useEffect(() => {

    dispatch(fetchVendors());

  }, [dispatch]);

  const filteredVendors =
    vendors.filter((vendor) =>
      vendor.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const activeVendors =
    vendors.filter(
      (vendor) =>
        vendor.status ===
        "Active"
    ).length;

  const highRiskVendors =
    vendors.filter(
      (vendor) =>
        vendor.risk === "High"
    ).length;

  const handleChangePage = (
    event,
    newPage
  ) => {

    setPage(newPage);

  };

  const handleChangeRowsPerPage =
    (event) => {

      setRowsPerPage(
        parseInt(
          event.target.value,
          10
        )
      );

      setPage(0);

    };

  const handleOpenDialog =
    () => {

      setEditId(null);

      setNewVendor({
        name: "",
        category: "",
        risk: "Low",
        status: "Active",
      });

      setOpenDialog(true);

    };

  const handleCloseDialog =
    () => {

      setOpenDialog(false);

    };

  const handleEdit = (
    vendor
  ) => {

    setEditId(vendor._id);

    setNewVendor({
      name: vendor.name,
      category:
        vendor.category,
      risk: vendor.risk,
      status:
        vendor.status,
    });

    setOpenDialog(true);

  };

  const handleSaveVendor =
    async () => {

      if (
        !newVendor.name ||
        !newVendor.category
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      try {

        if (editId !== null) {

          await dispatch(
            updateVendor({
              id: editId,
              vendorData:
                newVendor,
            })
          );

          toast.success(
            "Vendor Updated"
          );

        }

        else {

          await dispatch(
            addVendor(
              newVendor
            )
          );

          toast.success(
            "Vendor Added"
          );

        }

        dispatch(
          fetchVendors()
        );

        setOpenDialog(false);

      }

      catch (error) {

        toast.error(
          "Operation Failed"
        );

      }

    };

  const handleDelete =
    async (id) => {

      try {

        await dispatch(
          deleteVendor(id)
        );

        toast.error(
          "Vendor Deleted"
        );

        dispatch(
          fetchVendors()
        );

      }

      catch (error) {

        toast.error(
          "Delete Failed"
        );

      }

    };

  if (loading) {

    return (
      <Typography variant="h5">
        Loading Vendors...
      </Typography>
    );

  }

  if (error) {

    return (
      <Typography
        variant="h5"
        color="error"
      >
        {error}
      </Typography>
    );

  }

  return (

    <Box sx={{ p: 3 }}>

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >

        <Typography variant="h4">
          Vendor Governance
        </Typography>

        <Button
          variant="contained"
          onClick={
            handleOpenDialog
          }
        >
          Add Vendor
        </Button>

      </Box>

      {/* FIXED GRID */}
      <Grid
        container
        spacing={3}
        sx={{ mb: 3 }}
      >

        <Grid size={{ xs: 12, md: 4 }}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Total Vendors
              </Typography>

              <Typography variant="h4">
                {vendors.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Active Vendors
              </Typography>

              <Typography variant="h4">
                {activeVendors}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                High Risk Vendors
              </Typography>

              <Typography variant="h4">
                {highRiskVendors}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      <TextField
        label="Search Vendor"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <TableContainer
        component={Paper}
      >

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Vendor Name
              </TableCell>

              <TableCell>
                Category
              </TableCell>

              <TableCell>
                Risk
              </TableCell>

              <TableCell>
                Status
              </TableCell>

              <TableCell>
                Actions
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredVendors

              .slice(
                page *
                  rowsPerPage,
                page *
                  rowsPerPage +
                  rowsPerPage
              )

              .map((vendor) => (

                <TableRow
                  key={vendor._id}
                >

                  <TableCell>
                    {vendor.name}
                  </TableCell>

                  <TableCell>
                    {
                      vendor.category
                    }
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        vendor.risk
                      }

                      color={
                        vendor.risk ===
                        "Low"
                          ? "success"
                          : vendor.risk ===
                            "Medium"
                          ? "warning"
                          : "error"
                      }
                    />

                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        vendor.status
                      }

                      color={
                        vendor.status ===
                        "Active"
                          ? "success"
                          : "default"
                      }
                    />

                  </TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        mr: 1,
                      }}
                      onClick={() =>
                        handleEdit(
                          vendor
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() =>
                        handleDelete(
                          vendor._id
                        )
                      }
                    >
                      Delete
                    </Button>

                  </TableCell>

                </TableRow>

              ))}

          </TableBody>

        </Table>

        <TablePagination
          component="div"
          count={
            filteredVendors.length
          }
          page={page}
          onPageChange={
            handleChangePage
          }
          rowsPerPage={
            rowsPerPage
          }
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
          rowsPerPageOptions={[
            5,
            10,
            20,
          ]}
        />

      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={
          handleCloseDialog
        }
      >

        <DialogTitle>

          {editId !== null
            ? "Edit Vendor"
            : "Add Vendor"}

        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="dense"
            label="Vendor Name"
            value={
              newVendor.name
            }
            onChange={(e) =>
              setNewVendor({
                ...newVendor,
                name:
                  e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="Category"
            value={
              newVendor.category
            }
            onChange={(e) =>
              setNewVendor({
                ...newVendor,
                category:
                  e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            select
            margin="dense"
            label="Risk"
            value={
              newVendor.risk
            }
            onChange={(e) =>
              setNewVendor({
                ...newVendor,
                risk:
                  e.target.value,
              })
            }
          >

            <MenuItem value="Low">
              Low
            </MenuItem>

            <MenuItem value="Medium">
              Medium
            </MenuItem>

            <MenuItem value="High">
              High
            </MenuItem>

          </TextField>

          <TextField
            fullWidth
            select
            margin="dense"
            label="Status"
            value={
              newVendor.status
            }
            onChange={(e) =>
              setNewVendor({
                ...newVendor,
                status:
                  e.target.value,
              })
            }
          >

            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>

          </TextField>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={
              handleCloseDialog
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={
              handleSaveVendor
            }
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}

export default VendorListPage;
