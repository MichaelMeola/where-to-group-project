import React, { useState, useEffect } from 'react';
import MobileNavbar from './MobileNavbar.jsx'
import DesktopNavbar from './DesktopNavbar.jsx'

export default function Navbar() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 767 && window.innerHeight > 400);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024 && window.innerHeight > 400)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      {isDesktop ? <DesktopNavbar /> : <MobileNavbar />}
    </div>
  )
}
