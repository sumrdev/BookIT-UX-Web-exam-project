import Navbar from "./Navbar"

export default function rootLayout({page}: {page: React.ReactNode}) {
  return (
    <>
      <Navbar backbutton heading="Room info" profile="profile"></Navbar>
      <div >{page}</div>
    </>
  )
}
