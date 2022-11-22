import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Stack } from '@mui/material';
import SidebarItem from './SidebarItem';

const icons = [
  {
    icon: AddBoxIcon,
    name: "add",
    title: "Create Playlist",
  },
  {
    icon: FavoriteIcon,
    name: "liked",
    title: "Liked Songs",
  }
];

export default function BottomSidebar() {
  const menuItems = icons.map((icon) => {
    return <SidebarItem key={icon.name} type={icon.icon} name={icon.name} title={icon.title} />
  });
  return (
    <Box>
      <Stack spacing={2}>
        {menuItems}
      </Stack>
    </Box>
  );
}