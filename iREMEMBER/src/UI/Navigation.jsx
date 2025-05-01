import Logo from "./Logo";

export default function Navigation() {
  return (
    <nav className=" sticky top-0 left-0 bg-white px-12 max-[800px]:px-4">
      <div className="flex justify-between items-center border-b px-12 max-[600px]:px-4  py-4">
        <Logo />

        <div className="flex gap-2 ">
          <button className="p-2 border rounded-lg bg-green-500">Login</button>
          <button className="p-2 border rounded-lg">Sign Up</button>
        </div>
        {/* <ul className="flex gap-4 list-none">
            <li>ADD</li>
            <li>SORT</li>
            <li>REMOVE ALL</li>
        </ul> */}
      </div>
    </nav>
  )
}
