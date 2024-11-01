import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from '../components/App.jsx';
import Page404 from './Page404.jsx';
import About from './About.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/style.scss';
import ContactList from './Contacts.jsx';
import InfographicMapPage from './InfographicMapPage.jsx';
import HomePage from './HomePage.jsx'

const router = createBrowserRouter(
  [
      {
       path: "/",
       element: <App />,
       errorElement: <Page404 />,
       children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about.html",
          element: <About />,
        },
        {
          path: "/contacts.html",
          element: <ContactList />,
        },
       ],
      },
      {
       path: "*",
       element: <Page404 />,
      },
  ],
  {
      basename: "/grenso", // Устанавливаем базовый путь
  }
  );

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
