import {
    Box,
    Card,
    CardContent,
    Grid,
    Link,
    Typography,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import React, { useState, useEffect } from "react";
  import imgOne from "./assets/img1.png";
  import imgTwo from "./assets/img2.png";
  import imgThree from "./assets/img3.png";
  
  const categoryData = [
    {
      id: 1,
      title: "Design Your Own",
      images: [
        "https://assets.lummi.ai/assets/QmTPpqdQzkGjp7ueNruyoNgivVM988Zd6bmGKHntGFbMMR?auto=format&w=1500",
        "https://img.kwcdn.com/product/fancy/eb1a4192-ce78-41d9-84ea-cb15e2e124c0.jpg?imageView2/2/w/500/q/70/format/webp",
        "https://img.kwcdn.com/product/open/2024-08-11/1723366119832-50852788465c4bf8bef1e93309ed12b7-goods.jpeg?imageView2/2/w/500/q/70/format/webp",
      ],
      alt: "User customizing shoes with color and pattern options",
    },
    {
      id: 2,
      title: "Anime Inspired",
      images: [
        "https://attackontitanstuff.b-cdn.net/wp-content/uploads/2023/09/Attack-on-Titan-Men-s-Hoodie-Anime-Hoodies-Men-Women-Streetwear-Pullover-Harajuku-Shingeki-no-Kyojin-2-700x700.jpg",
        "https://th.bing.com/th/id/R.4a7104b41e689e30c8e2639909a6b599?rik=DYRensqjDi6jmA&riu=http%3a%2f%2feverythinganimee.com%2fcdn%2fshop%2ffiles%2fS4110946615074052bd1d036eb20cddb0A.webp%3fcrop%3dcenter%26height%3d1200%26v%3d1695848989%26width%3d1200&ehk=GTfPlVzmTVid5BZfGOBF9eQN%2fb6wdk%2bz9PJc3J1EcKg%3d&risl=&pid=ImgRaw&r=0",
        "https://attackontitanstuff.com/wp-content/uploads/2023/09/Attack-on-Titan-Men-s-Hoodie-Anime-Hoodies-Men-Women-Streetwear-Pullover-Harajuku-Shingeki-no-Kyojin-700x700.jpg",
      ],
      alt: "Anime-inspired items with vibrant colors and characters",
    },
    {
      id: 3,
      title: "Studio Curations",
      images: [
        imgOne,
        imgTwo,
        imgThree,
      ],
      alt: "Curated designs from the CustoFit studio",
    },
  ];
  
  const CategoryCard = styled(Card)({
    position: "relative",
    width: "419px",
    height: "557px",
    borderRadius: "6.64px",
    backgroundColor: "transparent",
    overflow: "hidden",
  });
  
  const CategoryImage = styled("img")(({ active }) => ({
    position: "absolute",
    top: "25px",
    left: "70px",
    width: "285.72px",
    height: "380.65px",
    objectFit: "cover",
    opacity: active ? 1 : 0,
    transition: "opacity 1s ease-in-out",
    zIndex: active ? 2 : 1,
  }));
  
  function CategoryCardItem({ title, images, alt }) {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [images.length]);
  
    return (
      <CategoryCard
        elevation={0}
        sx={{
          background: "linear-gradient(180deg, #7C3AED 0%, #0A1221 100%)",
        }}
      >
        {images.map((src, i) => (
          <CategoryImage key={i} src={src} alt={`${alt} ${i + 1}`} active={i === currentIndex} />
        ))}
  
        <CardContent
          sx={{
            position: "absolute",
            bottom: 20,
            left: 0,
            padding: "0 22px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Inter",
              fontWeight: 800,
              fontSize: "18.9848px",
              lineHeight: "23px",
              letterSpacing: "0.01em",
              color: "white",
            }}
          >
            {title}
          </Typography>
          <Link
            component="button"
            underline="none"
            sx={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "16px",
              color: "#CCCCCC",
            }}
          >
            Shop Collection
          </Link>
        </CardContent>
      </CategoryCard>
    );
  }
  
  const Category = () => (
    <Box
      sx={{
        width: "100%",
        padding: "0 74px 39px",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "45.6px",
            fontFamily: "Inter",
            fontWeight: "700",
            lineHeight: "55px",
            letterSpacing: "-0.05em",
            color: "black",
            mb: 2,
          }}
        >
          Shop by <span className="gradient-text">Category</span>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Inter",
            fontWeight: "500",
            fontSize: "19px",
            lineHeight: "23px",
            color: "#666",
          }}
        >
          Explore our collection of premium footwear for every occasion
        </Typography>
      </Box>
  
      <Grid container spacing={2} justifyContent="center">
        {categoryData.map((category) => (
          <Grid key={category.id}>
            <CategoryCardItem
              title={category.title}
              images={category.images}
              alt={category.alt}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  
  export default Category;