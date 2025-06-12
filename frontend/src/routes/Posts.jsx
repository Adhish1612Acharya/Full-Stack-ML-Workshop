import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";
import postService from "../services/postService";
import { formatDistanceToNow } from "date-fns";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await postService.getAllPosts();
      setPosts(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const renderSkeletons = () => {
    return Array(3)
      .fill(null)
      .map((_, index) => <PostCardSkeleton key={index} />);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          fontSize: isMobile ? "1.75rem" : "2.5rem",
        }}
      >
        Latest Posts
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        renderSkeletons()
      ) : posts.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6">No posts found</Typography>
        </Box>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            title={post.title}
            description={post.description}
            image={post.image}
            filters={post.filters}
            userName={post.user.fullName}
            profileImage={post.user.profileImage}
            createdAt={formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          />
        ))
      )}
    </Container>
  );
};

export default Posts;
