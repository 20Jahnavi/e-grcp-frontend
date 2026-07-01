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

const procurementData = [
  {
    name: "Approved",
    value: 8,
  },
  {
    name: "Pending",
    value: 4,
  },
  {
    name: "Rejected",
    value: 2,
  },
];

const vendorRiskData = [
  {
    risk: "Low",
    vendors: 12,
  },
  {
    risk: "Medium",
    vendors: 6,
  },
  {
    risk: "High",
    vendors: 3,
  },
];

const COLORS = [
  "#4caf50",
  "#ff9800",
  "#f44336",
];

function ReportsPage() {

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        sx={{ mb: 4 }}
      >
        Reports & Analytics
      </Typography>

      <Grid
        container
        spacing={3}
      >

        {/* Pie Chart */}
        <Grid
          xs={12}
          md={6}
        >

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

                <PieChart>

                  <Pie
                    data={
                      procurementData
                    }
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {procurementData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[index]
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
        <Grid
          xs={12}
          md={6}
        >

          <Card>

            <CardContent>

              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                Vendor Risk Levels
              </Typography>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={
                    vendorRiskData
                  }
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="risk" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="vendors"
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

export default ReportsPage;