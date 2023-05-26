import { useContext, useEffect } from "react"
import NavContext from "../contexts/NavContext"
function profile() {
    const {setShowBackbutton, setHeading, setProfile} = useContext(NavContext);
    useEffect(() => {
        setShowBackbutton(true);
        setHeading("Profile");
        setProfile("settings");
    }, [])
    return (
        <div>profile</div>
    )
}

export default profile