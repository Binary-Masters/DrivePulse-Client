import Link from "next/link";


const Navbar = () => {
 return (
  <header>
   <nav>
          <ul className="flex justify-center gap-3 alignItems-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/About">About</Link>
            </li>
          </ul>
        </nav>
  </header>
 );
};

export default Navbar;