import Navbar from "./Navbar"
import { useState, createContext, Dispatch, SetStateAction } from 'react'

type navbarContextType = {
  setShowBackbutton: Dispatch<SetStateAction<boolean>>
  setProfile: Dispatch<SetStateAction<string>>
  setHeading: Dispatch<SetStateAction<string>>
} | null;

export const Navbar_data = createContext<navbarContextType>(null);



export default function rootLayout({page}: {page: React.ReactNode}) {
  const [showBackbutton, setShowBackbutton] = useState(false);
  const [profile, setProfile] = useState("profile");
  const [heading, setHeading] = useState("HEADING");
  return (
    <>
      <Navbar backbutton={showBackbutton} heading={heading} profile={profile}></Navbar>
      <Navbar_data.Provider value={ {setShowBackbutton, setProfile, setHeading} }>
        <div >{page}</div>
      </Navbar_data.Provider>
    </>
  )
}
