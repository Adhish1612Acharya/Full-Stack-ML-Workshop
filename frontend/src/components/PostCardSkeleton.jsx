import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

const PostCardSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        width: 600,
        margin: "auto",
        borderRadius: 4,
        boxShadow: 4,
        overflow: "hidden",
        mb: 4,
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        height={isMobile ? 180 : 240}
        animation="wave"
      />

      <CardContent>
        {/* Title Skeleton */}
        <Skeleton height={30} width="80%" animation="wave" sx={{ mb: 1 }} />

        {/* Filter Badges Skeleton */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
          <Skeleton variant="rounded" width={60} height={24} animation="wave" />
          <Skeleton variant="rounded" width={50} height={24} animation="wave" />
          <Skeleton variant="rounded" width={70} height={24} animation="wave" />
        </Stack>

        {/* Description Skeleton */}
        <Skeleton height={18} width="100%" animation="wave" sx={{ mb: 1 }} />
        <Skeleton height={18} width="90%" animation="wave" sx={{ mb: 2 }} />

        {/* User & Time Skeleton */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
            <Skeleton width={100} height={20} animation="wave" sx={{ ml: 1 }} />
          </Box>
          <Skeleton width={60} height={16} animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCardSkeleton;
