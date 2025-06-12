import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const FeatureCard = ({ title, description, icon }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
      },
      width: "100%",
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          color: "primary.main",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      title: "Full Stack Development",
      description:
        "Learn to build modern web applications using React for frontend and Node.js for backend. Master RESTful APIs, database integration, and state management.",
      icon: "🚀",
    },
    {
      title: "Machine Learning Integration",
      description:
        "Discover how to integrate ML models into your applications. Learn about model deployment, API integration, and real-time predictions.",
      icon: "🤖",
    },
    {
      title: "API Development & Testing",
      description:
        "Master API development using Express.js and test your endpoints with Postman. Learn best practices for API design and documentation.",
      icon: "🔧",
    },
    {
      title: "Deployment & DevOps",
      description:
        "Learn to deploy your full stack applications and ML models. Understand CI/CD pipelines, containerization, and cloud services.",
      icon: "☁️",
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", width: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: isMobile ? "2.5rem" : "3.5rem",
              textAlign: "center",
            }}
          >
            Full Stack ML Workshop
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              maxWidth: "800px",
              mx: "auto",
              opacity: 0.9,
            }}
          >
            Master the art of building and deploying full stack applications
            with integrated machine learning models
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
          }}
        >
          What You'll Learn
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Workshop Details */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Card sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Workshop Overview
          </Typography>
          <Typography variant="body1" paragraph>
            This comprehensive workshop is designed for junior developers who
            want to enhance their skills in full stack development and machine
            learning integration. You'll learn how to build, test, and deploy
            complete applications that combine modern web technologies with
            powerful ML capabilities.
          </Typography>
          <Typography variant="body1" paragraph>
            Throughout the workshop, you'll work on hands-on projects that
            cover:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" paragraph>
              Building responsive frontends with React and Material-UI
            </Typography>
            <Typography component="li" paragraph>
              Creating robust backend APIs with Node.js and Express
            </Typography>
            <Typography component="li" paragraph>
              Integrating and deploying ML models
            </Typography>
            <Typography component="li" paragraph>
              Testing APIs with Postman
            </Typography>
            <Typography component="li" paragraph>
              Deploying applications to production
            </Typography>
          </Box>
        </Card>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Ready to Start Learning?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore our posts section to see examples of full stack applications
          with ML integration.
        </Typography>
        <Button
          component={RouterLink}
          to="/posts"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          View Example Posts
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
