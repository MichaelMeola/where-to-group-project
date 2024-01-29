import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css'

export default function Home() {

    const navigate = useNavigate();
    return(
        <div className='home-page-main-div'>
            <figure className='home-get-started-logo-figure'>
              <img
                src="../../pictures/whereto1.png"
                className="home-get-started-img"
              />
            </figure>
            <div className='home-get-started-button-div'>
            <Button 
            variant='contained' 
            color='primary'
            size='large'
            sx={{
              ":hover": { bgcolor: 'secondary'}
            }}
            onClick={() => navigate('/login')}>Get Started
            </Button>
            </div>
        </div>
    )

}