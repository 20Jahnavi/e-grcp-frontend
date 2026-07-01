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
    title: "",
    category: "",
    risk: "Low",
    status: "Active",
  });

  useEffect(() => {

    dispatch(fetchVendors());

  }, [dispatch]);

  const filteredVendors =
    vendors.filter((vendor) =>
      vendor.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const activeVendors =
    vendors.filter(
      (vendor) =>
        vendor.status === "Active"
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
      title: vendor.title,
      category:
        vendor.category,
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

        toast.success(
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

      <Grid
        container
        spacing={3}
        sx={{ mb: 3 }}
      >

        <Grid xs={12} md={4}>

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

        <Grid xs={12} md={4}>

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

        <Grid xs={12} md={4}>

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

                      color="success"
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

    </Box>

  );

}

export default VendorListPage;