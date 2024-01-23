import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import DesktopFooter from './Components/Footer/DesktopFooter.jsx'
import './App.css'


export default function App() {

    const location = useLocation();
    
    let landingNav = <Navbar/>
    let landingFooter = <Footer/>

    switch (location.pathname) {
        case '/':
            landingNav = null
            landingFooter = null
        case '/login':
            landingNav = null
            landingFooter = null
        case '/signup':
            landingNav = null
            landingFooter = null
    }
    return (
        <>
        {landingNav}
        <Outlet className='outlet-body'/>
        {landingFooter}
        </>
    )
}