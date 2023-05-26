import { useContext, useEffect } from "react"
import NavContext from "../contexts/NavContext"
function settings() {
    const {setShowBackbutton, setHeading, setProfile} = useContext(NavContext);
    useEffect(() => {
        setShowBackbutton(true);
        setHeading("Settings");
        setProfile("");
    }, [])
    return (
        <div>settings</div>
    )
}

export default settings