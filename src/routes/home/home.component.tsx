import { FC } from "react";
import Header from "../../components/header/header.component";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer.component";

const Home: FC = () => {
    return (
        <div id="wrapper">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Home;