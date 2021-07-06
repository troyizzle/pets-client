import Navbar from "./Navbar"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <div className="mx-auto bg-gray-700">
      <Navbar />
      <div className="px-4">
        {props.children}
      </div>
    </div>
  )
}
