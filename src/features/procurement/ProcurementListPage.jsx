
import {
  useState,
  useEffect,
} from "react";

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
  Button,
  Box,
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
  fetchRequests,
} from "../../store/slices/procurementSlice";

function ProcurementListPage() {

  const dispatch = useDispatch();

  const {
    requests = [],
    loading,
    error,
  } = useSelector(
    (state) =>
      state.procurement || {}
  );

  // Search
  const [search, setSearch] =
    useState("");

  // Pagination
  const [page, setPage] =
    useState(0);

  const [
    rowsPerPage,
    setRowsPerPage,
  ] = useState(5);

  // Dialog
  const [
    openDialog,
    setOpenDialog,
  ] = useState(false);

  // Edit Mode
  const [editId, setEditId] =
    useState(null);

  // Form
  const [
    newRequest,
    setNewRequest,
  ] = useState({
    department: "",
    amount: "",
    status: "Pending",
  });

  // Local Requests State
  const [
    allRequests,
    setAllRequests,
  ] = useState([]);

  // Fetch Requests
  useEffect(() => {

    dispatch(fetchRequests());

  }, [dispatch]);

  // Load Requests
  useEffect(() => {

    setAllRequests(requests);

  }, [requests]);

  // Search Filter
  const filteredRequests =
    allRequests.filter(
      (request) =>
        request.department
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // Pagination
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

  // Approve
  const handleApprove = (
    id
  ) => {

    const updated =
      allRequests.map(
        (req) =>
          req.id === id
            ? {
                ...req,
                status:
                  "Approved",
              }
            : req
      );

    setAllRequests(updated);

    toast.success(
      "Request Approved"
    );

  };

  // Reject
  const handleReject = (
    id
  ) => {

    const updated =
      allRequests.map(
        (req) =>
          req.id === id
            ? {
                ...req,
                status:
                  "Rejected",
              }
            : req
      );

    setAllRequests(updated);

    toast.error(
      "Request Rejected"
    );

  };

  // Delete
  const handleDelete = (
    id
  ) => {

    const updated =
      allRequests.filter(
        (req) =>
          req.id !== id
      );

    setAllRequests(updated);

    toast.error(
      "Request Deleted"
    );

  };

  // Open Add Dialog
  const handleOpenDialog =
    () => {

      setEditId(null);

      setNewRequest({
        department: "",
        amount: "",
        status: "Pending",
      });

      setOpenDialog(true);

    };

  // Edit Dialog
  const handleEdit = (
    request
  ) => {

    setEditId(request.id);

    setNewRequest({
      department:
        request.department,

      amount:
        request.amount,

      status:
        request.status,
    });

    setOpenDialog(true);

  };

  // Close Dialog
  const handleCloseDialog =
    () => {

      setOpenDialog(false);

    };

  // Save Request
  const handleSaveRequest =
    () => {

      if (
        !newRequest.department ||
        !newRequest.amount
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      // Edit
      if (editId !== null) {

        const updated =
          allRequests.map(
            (req) =>
              req.id === editId
                ? {
                    ...req,
                    ...newRequest,
                  }
                : req
          );

        setAllRequests(updated);

        toast.success(
          "Request Updated"
        );

      }

      // Add
      else {

        const request = {
          id: Date.now(),

          department:
            newRequest.department,

          amount:
            newRequest.amount,

          status:
            newRequest.status,
        };

        setAllRequests([
          ...allRequests,
          request,
        ]);

        toast.success(
          "New Request Added"
        );

      }

      setOpenDialog(false);

    };

  // Loading
  if (loading) {

    return (
      <Typography variant="h5">
        Loading Requests...
      </Typography>
    );

  }

  // Error
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

      {/* Header */}
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
          Procurement Requests
        </Typography>

        <Button
          variant="contained"
          onClick={
            handleOpenDialog
          }
        >
          Add Request
        </Button>

      </Box>

      {/* Search */}
      <TextField
        label="Search Department"
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

      {/* Table */}
      <TableContainer
        component={Paper}
      >

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                ID
              </TableCell>

              <TableCell>
                Department
              </TableCell>

              <TableCell>
                Amount
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

            {filteredRequests

              .slice(
                page *
                  rowsPerPage,

                page *
                  rowsPerPage +
                  rowsPerPage
              )

              .map((request) => (

                <TableRow
                  key={request.id}
                >

                  <TableCell>
                    {request.id}
                  </TableCell>

                  <TableCell>
                    {
                      request.department
                    }
                  </TableCell>

                  <TableCell>
                    ₹
                    {
                      request.amount
                    }
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        request.status
                      }

                      color={
                        request.status ===
                        "Approved"
                          ? "success"
                          : request.status ===
                            "Pending"
                          ? "warning"
                          : "error"
                      }
                    />

                  </TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() =>
                        handleEdit(
                          request
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() =>
                        handleApprove(
                          request.id
                        )
                      }
                    >
                      Approve
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() =>
                        handleReject(
                          request.id
                        )
                      }
                    >
                      Reject
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() =>
                        handleDelete(
                          request.id
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
            filteredRequests.length
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

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={
          handleCloseDialog
        }
      >

        <DialogTitle>

          {editId !== null
            ? "Edit Request"
            : "Add Request"}

        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="dense"
            label="Department"
            value={
              newRequest.department
            }
            onChange={(e) =>
              setNewRequest({
                ...newRequest,
                department:
                  e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            type="number"
            label="Amount"
            value={
              newRequest.amount
            }
            onChange={(e) =>
              setNewRequest({
                ...newRequest,
                amount:
                  e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            select
            margin="dense"
            label="Status"
            value={
              newRequest.status
            }
            onChange={(e) =>
              setNewRequest({
                ...newRequest,
                status:
                  e.target.value,
              })
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
              handleSaveRequest
            }
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}

export default ProcurementListPage;
