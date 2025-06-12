import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const PostCard = ({
  title,
  description,
  image,
  createdAt,
  userName,
  profileImage,
  filters = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        borderRadius: 4,
        boxShadow: 4,
        overflow: "hidden",
        mb: 4,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 8,
        },
      }}
    >
      <CardMedia
        component="img"
        height={isMobile ? 180 : 240}
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
          {filters.map((filter, index) => (
            <Chip key={index} label={filter} color="primary" size="small" />
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar
              src={profileImage}
              alt={userName}
              sx={{ width: 36, height: 36, mr: 1 }}
            />
            <Typography variant="body2" fontWeight="medium">
              {userName}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {createdAt}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
