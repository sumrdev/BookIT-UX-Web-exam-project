import Navbar from "./Navbar"
import { NavProvider } from "../contexts/NavContext"
import { UserProvider } from "../contexts/UserContext"



export default function rootLayout({page}: {page: React.ReactNode}) {

  return (
    <NavProvider>
      <UserProvider>
      <Navbar />
      <div >{page}</div>
      </UserProvider>
    </NavProvider>
  )
}
