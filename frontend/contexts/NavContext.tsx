import {createContext, Dispatch, SetStateAction, useState} from 'react'

type NavbarContextType = {
    showBackbutton: boolean,
    setShowBackbutton: Dispatch<SetStateAction<boolean>>
    profile: string,
    setProfile: Dispatch<SetStateAction<string>>
    heading: string,
    setHeading: Dispatch<SetStateAction<string>>
  };

  // setup context with default values
const NavContext = createContext<NavbarContextType>({showBackbutton: false, setShowBackbutton: () => {}, profile: "profile", setProfile: () => {}, heading: "HEADING", setHeading: () => {}});
  

export function NavProvider({ children }: { children: React.ReactNode }) {

    const [showBackbutton, setShowBackbutton] = useState(false);
    const [profile, setProfile] = useState("profile");
    const [heading, setHeading] = useState("HEADING");

  return (
    <NavContext.Provider value={ {showBackbutton, setShowBackbutton, profile, setProfile, heading, setHeading} }>{children}</NavContext.Provider>
  )
}

export default NavContext