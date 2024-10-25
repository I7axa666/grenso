import Header from './Header';
import MainPage from './MainPage';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import '../css/App.css'

function App() {
 
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <MainPage />
        <Outlet />
        <Footer />
      </div>

    </div>
  )  
}

export default App
