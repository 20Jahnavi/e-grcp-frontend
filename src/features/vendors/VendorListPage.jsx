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
  addVendor,
  updateVendor,
  deleteVendor,
} from "./vendorSlice";

function VendorListPage() {

  const dispatch = useDispatch();

  const {
    vendors = [],
    loading = false,
    error = null,
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
    title: "",
    category: "",
    risk: "Low",
    status: "Active",
  });

  // SAFE ARRAY CHECK
  const safeVendors =
    Array.isArray(vendors)
      ? vendors
      : [];

  const filteredVendors =
    safeVendors.filter((vendor) =>
      vendor?.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const activeVendors =
    safeVendors.filter(
      (vendor) =>
        vendor?.status === "Active"
    ).length;

  const highRiskVendors =
    safeVendors.filter(
      (vendor) =>
        vendor?.risk === "High"
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
        title: "",
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

    setEditId(vendor.id);

    setNewVendor({
      title: vendor.title || "",
      category:
        vendor.category || "",
      risk:
        vendor.risk || "Low",
      status:
        vendor.status ||
        "Active",
    });

    setOpenDialog(true);

  };

  const handleSaveVendor =
    async () => {

      if (
        !newVendor.title ||
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

        toast.success(
          "Vendor Deleted"
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

      {/* ERROR MESSAGE */}

      {error && (

        <Typography
          color="error"
          sx={{ mb: 2 }}
        >
          {typeof error === "string"
            ? error
            : "API Error"}
        </Typography>

      )}

      <Grid
        container
        spacing={3}
        sx={{ mb: 3 }}
      >

        <Grid item xs={12} md={4}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Total Vendors
              </Typography>

              <Typography variant="h4">
                {safeVendors.length}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

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

        <Grid item xs={12} md={4}>

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

            {filteredVendors.length >
            0 ? (

              filteredVendors

                .slice(
                  page *
                    rowsPerPage,
                  page *
                    rowsPerPage +
                    rowsPerPage
                )

                .map((vendor) => (

                  <TableRow
                    key={vendor.id}
                  >

                    <TableCell>
                      {vendor.title}
                    </TableCell>

                    <TableCell>
                      {
                        vendor.category
                      }
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={
                          vendor.risk ||
                          "Low"
                        }
                        color="success"
                      />

                    </TableCell>

                    <TableCell>

                      <Chip
                        label={
                          vendor.status ||
                          "Active"
                        }
                        color="primary"
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
                            vendor.id
                          )
                        }
                      >
                        Delete
                      </Button>

                    </TableCell>

                  </TableRow>

                ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No Vendors Found
                </TableCell>

              </TableRow>

            )}

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

      {/* DIALOG */}

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
            label="Vendor Name"
            margin="normal"
            value={
              newVendor.title
            }
            onChange={(e) =>
              setNewVendor({
                ...newVendor,
                title:
                  e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="Category"
            margin="normal"
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
            select
            fullWidth
            label="Risk"
            margin="normal"
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
            select
            fullWidth
            label="Status"
            margin="normal"
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