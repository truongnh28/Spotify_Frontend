import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Box sx={{
            pt: 3,
            px: 3
          }}>
            This is sidebar
          </Box>
        </Grid>
        <Grid item xs={10}>
          This is main
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;