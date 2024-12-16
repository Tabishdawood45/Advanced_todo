import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './screens/Home';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Authentication,{AuthenticationMode} from './screens/Authentication';
import ErrorPage from './screens/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import UseProvider from './context/UserProvider';


const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />
  },
  {
    path: "/signin",
    element: <Authentication authenticationMode={AuthenticationMode.Login} />
  },
  {
    path: "/signup",
    element: <Authentication authenticationMode={AuthenticationMode.Register} />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path:"/",
        element: <Home />
  }
]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UseProvider>
    <RouterProvider router={router}/>
    </UseProvider>
  </React.StrictMode>
);

reportWebVitals();
