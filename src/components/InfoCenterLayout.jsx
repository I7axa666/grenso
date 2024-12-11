import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import '../css/App.css';
function InfoCenterLayout() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Outlet />
        <Footer />
      </div>

    </div>
  );
}

export default InfoCenterLayout;