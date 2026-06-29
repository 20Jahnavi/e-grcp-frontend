import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
} from "@mui/material";

function RiskPage() {

  const risks = [
    {
      id: 1,
      vendor: "Infosys",
      level: "High",
      score: 90,
    },
    {
      id: 2,
      vendor: "TCS",
      level: "Medium",
      score: 65,
    },
    {
      id: 3,
      vendor: "Wipro",
      level: "Low",
      score: 30,
    },
  ];

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Risk Management
      </Typography>

      <Grid container spacing={3}>

        {risks.map((risk) => (

          <Grid
            item
            xs={12}
            md={4}
            key={risk.id}
          >

            <Card>

              <CardContent>

                <Typography variant="h6">
                  {risk.vendor}
                </Typography>

                <Typography
                  sx={{ mt: 1 }}
                >
                  Risk Score:
                  {" "}
                  {risk.score}
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={risk.score}
                  sx={{ mt: 2, mb: 2 }}
                />

                <Chip
                  label={risk.level}
                  color={
                    risk.level === "High"
                      ? "error"
                      : risk.level === "Medium"
                      ? "warning"
                      : "success"
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

export default RiskPage;