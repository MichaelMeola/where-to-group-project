import SignUp from "./Register";
import { useState } from "react";
export default function LandingPage() {
    const [toggleBtn, setToggleBtn] = useState(false)
                        
    return(
        <>
        <SignUp />
        </>
    )
    
}