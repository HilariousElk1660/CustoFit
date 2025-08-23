import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SparklesIcon } from "../../assets/Icons.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <Box
    className="footer"
      sx={{ backgroundColor: "white", borderTop: "1px solid #e5e7eb", mt: 4 }}
    >
      <Container maxWidth="xl" sx={{ padding: "40px 26px 20px" }}>
        <Grid
          container
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              width: "calc(100% / 4)",
            }}
          >
            <div className="logo logo-footer">
              <span>Custo</span>
              Fit <SparklesIcon />
            </div>
            <Typography
              variant="body2"
              sx={{ color: "#64748b", maxWidth: "260px", mb: 2 }}
            >
              Create and customise your own clothing with our easy-to-use design
              tools.
            </Typography>
            <Stack className="social-icons" direction="row" spacing={2}>
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faYoutube} />
            </Stack>
          </Grid>

          <Grid
            sx={{
              width: "calc(100% / 6)",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Shop
            </Typography>
            <Stack
              spacing={1}
              sx={{
                fontSize: "12px",
              }}
            >
              <Link to="/products" className="footer-links">
                All Products
              </Link>
              <Link to="/studio" className="footer-links">
                Design Studio
              </Link>
              <Link to="/cart" className="footer-links">
                Cart
              </Link>
            </Stack>
          </Grid>

          <Grid
            sx={{
              width: "calc(100% / 6)",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Company
            </Typography>
            <Stack
              spacing={1}
              sx={{
                fontSize: "12px",
              }}
            >
              <Link to="/" className="footer-links">
                About Us
              </Link>
              <Link to="/" className="footer-links">
                Contact
              </Link>
              <Link to="/" className="footer-links">
                Careers
              </Link>
              <Link to="/" className="footer-links">
                Blog
              </Link>
            </Stack>
          </Grid>

          <Grid
            sx={{
              width: "calc(100% / 4)",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#475569", mb: 2, fontSize: "12px" }}
            >
              Subscribe to get special offers, free giveaways, and design
              inspiration.
            </Typography>
            <Stack direction="row">
              <TextField
                placeholder="Your email"
                size="small"
                variant="outlined"
                sx={{ flexGrow: 1, bgcolor: "white" }}
              />
              <Button
                variant="contained"
                sx={{
                  ml: 1,
                  backgroundColor: "#7c3aed",
                  "&:hover": { backgroundColor: "#6d28d9" },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
        >
          <Typography
            variant="body2"
            sx={{ color: "#64748b", mb: { xs: 2, sm: 0 } }}
          >
            © 2025 CustoFit. All rights reserved.
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              fontSize: "12px",
            }}
          >
            <Link href="#" underline="none" sx={{ color: "#64748b" }}>
              Privacy Policy
            </Link>
            <Link href="#" underline="none" sx={{ color: "#64748b" }}>
              Terms of Service
            </Link>
            <Link href="#" underline="none" sx={{ color: "#64748b" }}>
              Cookie Policy
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
