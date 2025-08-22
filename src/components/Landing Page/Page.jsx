import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import "@fontsource/inter";
import { Link } from "react-router-dom";
import HoodieVideo from "../../assets/videoplayback-VEED.gif";

const Page = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "521px",
        background: "black",
        overflow: "hidden",
      }}
    >
      <Box
        component="iframe"
        src={HoodieVideo}
        alt="3D Hoodie Animation"
        sx={{
          position: "absolute",
          width: "644px",
          height: "664px",
          top: "-61px",
          right: 0,
          objectFit: "cover",
        }}
      />

      <Container>
        <Box
          sx={{
            position: "relative",
            pt: 15,
            width: "523.98px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              width: "455px",
              mb: 2,
              fontFamily: "'Inter-ExtraBold', Helvetica",
              fontWeight: 800,
              fontSize: "57px",
              lineHeight: "57px",
              letterSpacing: "-2.85px",
              color: "white",
            }}
          >
            Wear What <span className="gradient-text">Moves</span> You
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "#CCCCCC",
            }}
          >
            From bold colors to custom cuts, we make clothes that speak your
            language. Designed by you, worn with pride.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "125px",
                background: "#7c3aed",
                color: "white",
                fontFamily: "Inter",
                padding: "10px 16px",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "13.29px",
                lineHeight: "146.38%",
                borderRadius: "5.69545px",
              }}
            >
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Shop Now
              </Link>
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: "146px",
                background: "#000000",
                border: "0.949242px solid #7c3aed",
                borderRadius: "5.69545px",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "13.29px",
                lineHeight: "146.38%",
                color: "white",
              }}
            >
              <Link
                to="/studio"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Design Studio
              </Link>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Page;
