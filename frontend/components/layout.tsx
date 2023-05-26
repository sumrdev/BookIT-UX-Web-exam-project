import Navbar from "./Navbar"
import { NavProvider } from "../contexts/NavContext"



export default function rootLayout({page}: {page: React.ReactNode}) {

  return (
    <NavProvider>
      <Navbar />
      <div >{page}</div>
    </NavProvider>
  )
}
