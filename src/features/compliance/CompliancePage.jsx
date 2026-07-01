import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from "@mui/material";

function CompliancePage() {

  const complianceData = [
    {
      id: 1,
      policy: "ISO Security Policy",
      completion: 95,
      status: "Compliant",
    },
    {
      id: 2,
      policy: "Vendor Audit",
      completion: 70,
      status: "Pending",
    },
    {
      id: 3,
      policy: "Procurement Guidelines",
      completion: 100,
      status: "Completed",
    },
  ];

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Compliance Management
      </Typography>

      <Grid container spacing={3}>

        {complianceData.map((item) => (

          <Grid
            xs={12}
            md={4}
            key={item.id}
          >

            <Card>

              <CardContent>

                <Typography variant="h6">
                  {item.policy}
                </Typography>

                <Typography sx={{ mt: 2 }}>
                  Completion:
                  {" "}
                  {item.completion}%
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={item.completion}
                  sx={{ mt: 2, mb: 2 }}
                />

                <Chip
                  label={item.status}
                  color={
                    item.status ===
                    "Completed"
                      ? "success"
                      : item.status ===
                        "Pending"
                      ? "warning"
                      : "primary"
                  }
                />

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Box>

  );
}

export default CompliancePage;