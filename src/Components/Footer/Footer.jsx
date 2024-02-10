import React, { useState, useEffect } from 'react';
import MobileFooter from './MobileFooter';
import DesktopFooter from './DesktopFooter';


const Footer = () => {
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
      {isDesktop ? <DesktopFooter /> : <MobileFooter />}
    </div>
  );
};

export default Footer;