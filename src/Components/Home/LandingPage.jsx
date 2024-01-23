import SignUp from "./SignUp";
import Login from "./Login";
import Button from '@mui/material/Button';

import { useState } from "react";
export default function LandingPage() {
    const [toggleBtn, setToggleBtn] = useState(true)
    if(toggleBtn)
    return(
        <>
        <Login />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setToggleBtn(!toggleBtn)}
            >
              Sign In
        </Button>
        </>
    )
    else{
        return(
            <>
            <SignUp />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setToggleBtn(!toggleBtn)}
            >
              Log In
            </Button>
            </>
        )
    }
    
}