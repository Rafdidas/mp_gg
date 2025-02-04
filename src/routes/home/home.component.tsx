import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/header/header.component";
import Footer from "../../components/layout/footer/footer.component";

const Home: FC = () => {
  return (
    <div id="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
