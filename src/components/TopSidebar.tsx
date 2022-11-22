import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SidebarItem from './SidebarItem';
import { Box, Stack } from '@mui/material';


const icons = [
  {
    icon: HomeIcon,
    name: "home",
    title: "Home",
  },
  {
    icon: SearchIcon,
    name: "search",
    title: "Search",
  },
  {
    icon: LibraryMusicIcon,
    name: "library",
    title: "Your Library",
  }
]


export default function TopSidebar() {
  const menuItems = icons.map((icon) => {
    return <SidebarItem type={icon.icon} name={icon.name} title={icon.title} />
  })
  return (
    <Box>
      <Stack spacing={2}>
        {menuItems}
      </Stack>
    </Box>
  );
}