import Page from "../../components/Landing Page/Page.jsx";
import Featured from "../../components/Featured/Featured.jsx";
import Category from "../../components/Category/Category.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Home.css";

function Home() {
  return (
    <>
      <Page />
      <Featured />
      <Category />
      <Footer />
    </>
  );
}

export default Home;
