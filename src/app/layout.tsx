import './globals.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>

        <main className="h-screen w-full ">{children}</main>
      </body>
    </html>
  )
}

// sign in
const Header = () => {
  return <div></div>
}
