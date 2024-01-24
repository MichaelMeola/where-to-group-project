// placeholder data for group component
import { useProfileStore } from "../../globalState.jsx";


export default function Group() {
    const { profile } = useProfileStore()
    console.log(profile);
   

    return (
        <div>
            <h1>{profile.username}</h1>
        </div>
    );
}

// Usage:


