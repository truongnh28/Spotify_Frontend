import { Box, Stack, Typography } from "@mui/material";

interface Props {
  type: any,
  name: string,
  title: string,
}

export default function SidebarItem(props: Props) {
  const Component = props.type;
  return (
    <Box sx={{
      px: 3,
    }} >
      <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
        <Component fontSize="large" />
        <Typography>Home</Typography>
      </Stack>
    </Box>
  );
}