import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import { useMemo, useState } from "react";
import { ToastContainer }
from "react-toastify";
import AppRouter from "./routes/AppRouter";

function App() {

  const [darkMode, setDarkMode] =
    useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode
            ? "dark"
            : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <AppRouter
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <ToastContainer
  position="top-right"
  autoClose={3000}
/>

    </ThemeProvider>
  );
}

export default App;