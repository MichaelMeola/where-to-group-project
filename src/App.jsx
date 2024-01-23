import { Outlet } from 'react-router-dom'
// import NavbarMain from './Components/Navbar/NavbarMain.jsx'
// import Footer from './Components/Footer/Footer.jsx'
import './App.css'
import Group from './Components/Group.jsx'
export default function App() {
    return (
        <>
        {/* <NavbarMain /> */}
        
        <Outlet className='outlet-body'/>
        {/* <Footer /> */}
        </>
    )
}