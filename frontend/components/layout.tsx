

export default function rootLayout({page}: {page: React.ReactNode}) {
  return (
    <>
      <div>Navbar</div>
      <div >{page}</div>
    </>
  )
}
