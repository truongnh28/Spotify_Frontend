import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid, Stack } from '@mui/material';
import Logo from './components/Logo';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';

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
            <Stack spacing={1}>
              <Logo />
              <Home />
              <Search />
              <Library />
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