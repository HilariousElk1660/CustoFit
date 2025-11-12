import React from "react";
import Page from "../../components/Landing Page/Page.jsx";
import Featured from "../../components/Featured/Featured.jsx";
import Category from "../../components/Category/Category.jsx";
import "./Home.css";
import Carousel from "../../components/Caroursel/Carousel.jsx";

function Home() {
  return (
    <>
      <Page />
      <Carousel />
      <Featured />
      <Category />
    </>
  );
}

export default Home;
