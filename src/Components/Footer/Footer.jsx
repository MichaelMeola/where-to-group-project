import React from 'react'
import { useLocation } from 'react-router-dom'
const Footer= () => {

  const location = useLocation()
  let innerElement = <footer>
  <div className='container-fluid font-small pt-4'>
    <div className='row'>
      
      <div className='col-md-3 mt-md-0 mt-3'>
        <ul className='list-unstyled'>
          <li><a className='footer-link' href="">Events</a></li>
        </ul>
      </div>

      <div className='col-md-3 mt-md-0 mt-3'>
        <ul className='list-unstyled'>
          <li><a className='footer-link' href="">Home</a></li>
        </ul>
      </div>

      <div className='col-md-3 mt-md-0 mt-3' >
        <ul className='list-unstyled'>
          <li><a className='footer-link' href="">Groups</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div className='footer-copyright text-center py-3 copyright-div'> © 2023 Copyright:
    <a className='footer-link' href="https://www.linkedin.com/in/richard-webber-b1a052276/">MGR.LLC</a>
  </div>
</footer>
  switch (location.pathname) {
    case '/':
          innerElement = null
      
  }
  console.log('location:', location);
  return (
    <>
      {innerElement}
    </>
  )
  
}
export default Footer