import { Card, CardContent, Typography } from "@mui/material";

export default function CardMusic() {
  return (
    <Card sx={{
      backgroundColor: "#161616",
      color: "white",
    }}>
      <CardContent>
        <img src="https://i.scdn.co/image/ab67706f00000002b9c1ff6dac384a87747d5f48" alt="" width="100%" height="100%" />
        <Typography variant="h6">Today's Top Hits</Typography>
        <Typography>Sam Smith & Kim Petras are on top of the Hottest 50!</Typography>
      </CardContent>
    </Card>
  );
}