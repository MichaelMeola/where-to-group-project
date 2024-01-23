import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Home() {

    const navigate = useNavigate();
    return(
        <>
            <h1>Home</h1>
            <Button onClick={() => navigate('/login')}>Get Started</Button>
        </>
    )

}