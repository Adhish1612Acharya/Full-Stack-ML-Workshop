import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";
// import postService from "../services/postService";

const AiSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      // const response = await postService.searchPosts(query);
      // setResults(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong while searching posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          fontSize: isMobile ? "1.75rem" : "2.5rem",
        }}
      >
        AI-powered Post Search
      </Typography>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mb: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Describe what you're looking for..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500 }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !query.trim()}
          sx={{ minWidth: 120 }}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Stack spacing={2} alignItems="center">
          {[...Array(3)].map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </Stack>
      ) : results.length > 0 ? (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {results.map((post) => (
            <PostCard
              key={post._id}
              title={post.title}
              description={post.description}
              image={post.image}
              filters={post.filters}
              userName={post.user.fullName}
              profileImage={post.user.profileImage}
              createdAt={new Date(post.createdAt).toLocaleString()}
            />
          ))}
        </Container>
      ) : (
        !loading && (
          <Typography variant="body1" color="text.secondary" align="center">
            No results yet. Try searching for something!
          </Typography>
        )
      )}
    </Container>
  );
};

export default AiSearch;
