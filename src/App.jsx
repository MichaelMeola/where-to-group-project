import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import DesktopFooter from './Components/Footer/DesktopFooter.jsx'
import './App.css'


export default function App() {
    return (
        <>
        <Navbar />
        <Outlet className='outlet-body'/>
        <Footer />
        </>
    )
}