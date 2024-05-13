import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './Components/AddCoffee.jsx';
import UpdateCoffee from './Components/UpdateCoffee.jsx';
import SingUp from './Components/SingUp.jsx';
import SignIn from './Components/SignIn.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import User from './Components/User.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader:()=> fetch('http://localhost:3000/coffee')
  },
  {
    path: "addCoffee",
    element: <AddCoffee></AddCoffee>,
  },
  {
    path: "updateCoffee/:id",
    element: <UpdateCoffee></UpdateCoffee>,
    loader:({params})=>fetch(`http://localhost:3000/coffee/${params.id}`)
  },
  {
    path:'/signup',
    element:<SingUp></SingUp>
  },
  {
    path:'/signin',
    element: <SignIn></SignIn>
  },
  {
    path: '/user',
    element:<User></User>,
    loader:()=>fetch('http://localhost:3000/user')
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
