import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid, Stack } from '@mui/material';
import Logo from './components/Logo';
import TopSidebar from './components/TopSidebar';
import BottomSidebar from './components/BottomSidebar';

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
          }}>
            <Stack spacing={2}>
              <Logo />
              <Stack spacing={4}>
                <TopSidebar />
                <BottomSidebar />
              </Stack>
            </Stack>
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