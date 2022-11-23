import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid } from '@mui/material';
import SideBar from './components/Sidebar';
import MainAppBar from './components/MainAppBar';
import MainContent from './components/MainContent';

function App() {
  return (
    <>
      <CssBaseline />
      <Box height="100vh" bgcolor="#000000" color="white">
        <Grid container spacing={0}>
          <Grid item xs={2} bgcolor="#000000">
            <SideBar />
          </Grid>
          <Grid item xs={10}>
            <MainAppBar />
            <MainContent />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;