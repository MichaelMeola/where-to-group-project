import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Components/Home/Home.jsx'
import Group from './Components/Group.jsx'

// import Home from './Components/Home/Home.jsx'
import LandingPage from './Components/Home/LandingPage.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />}/>
      {/* <Route path='/logIn' element={<LogIn />}/> */}
      <Route path='/groups' element={<Group />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
