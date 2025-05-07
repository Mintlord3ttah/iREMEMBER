import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="flex justify-between py-4 px-24 border-t mt-10 max-[800px]:px-8">
        <Logo />
        <p className="text-sm">&copy; May 2025 by mint</p>
        <span>All Rights Reserved</span>
    </footer>
  )
}
