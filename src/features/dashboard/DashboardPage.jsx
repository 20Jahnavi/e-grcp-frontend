
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function DashboardPage() {

  // Dummy Data
  const vendors = 12;

  const requests = 25;

  const approved = 15;

  const rejected = 5;

  // Pie Chart Data
  const riskData = [
    {
      name: "Low Risk",
      value: 6,
    },
    {
      name: "Medium Risk",
      value: 4,
    },
    {
      name: "High Risk",
      value: 2,
    },
  ];

  // Bar Chart Data
  const procurementData = [
    {
      name: "Approved",
      count: 15,
    },
    {
      name: "Pending",
      count: 5,
    },
    {
      name: "Rejected",
      count: 5,
    },
  ];

  const COLORS = [
    "#4caf50",
    "#ff9800",
    "#f44336",
  ];

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >

        <Grid xs={12} md={3}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Vendors
              </Typography>

              <Typography variant="h4">
                {vendors}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid xs={12} md={3}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Requests
              </Typography>

              <Typography variant="h4">
                {requests}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid xs={12} md={3}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Approved
              </Typography>

              <Typography variant="h4">
                {approved}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid xs={12} md={3}>

          <Card>

            <CardContent>

              <Typography variant="h6">
                Rejected
              </Typography>

              <Typography variant="h4">
                {rejected}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>

        {/* Pie Chart */}
        <Grid xs={12} md={6}>

          <Card>

            <CardContent>

              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                Vendor Risk Distribution
              </Typography>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={riskData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {riskData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </CardContent>

          </Card>

        </Grid>

        {/* Bar Chart */}
        <Grid xs={12} md={6}>

          <Card>

            <CardContent>

              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                Procurement Status
              </Typography>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={
                    procurementData
                  }
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="count"
                    fill="#1976d2"
                  />

                </BarChart>

              </ResponsiveContainer>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Box>
  );
}

export default DashboardPage;
