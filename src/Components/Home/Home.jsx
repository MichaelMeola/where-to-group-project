import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css'
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

export default function Home() {

    const navigate = useNavigate();
    const[loading, setLoading] = useState(false)

    const handleClick = () => {
      setLoading(true)
      setTimeout(() => {
        navigate('/login')
        setLoading(false)
      }, 1000 )
    }
 
    return(
        <div className='home-page-main-div'>
            <figure className='home-get-started-logo-figure'>
              <img
                src="../../pictures/whereto1.png"
                className="home-get-started-img"
              />
            </figure>
            <div className='home-get-started-button-div'>
            {!loading ? (
              <Button 
                variant='contained' 
                color='primary'
                size='large'
                sx={{
                 ":hover": { bgcolor: 'secondary'}
                }}
                onClick={handleClick}>Get Started
                </Button>
            ) : (
              <CircularProgress />
            )}
            </div>
        </div>
    )

}