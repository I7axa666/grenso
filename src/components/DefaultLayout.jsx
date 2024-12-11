import Header from './Header';
import Footer from './Footer';
import MainPage from './MainPage';
import { Outlet } from 'react-router-dom';
import '../css/App.css';

function DefaultLayout() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <MainPage />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default DefaultLayout;