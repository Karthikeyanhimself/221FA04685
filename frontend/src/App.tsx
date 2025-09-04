import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShortenerPage from "./pages/shortenerpage";
import StatisticsPage from "./pages/statisticspage";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            URL Shortener
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Shorten URL
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/stats"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Statistics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
