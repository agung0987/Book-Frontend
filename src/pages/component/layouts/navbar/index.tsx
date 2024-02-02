import Link from "next/link";
import Cookies from "js-cookie";
import { useAuth } from "@/store/auth/authState";


const Navbar = () => {
  const {logout} = useAuth();
  const logoutHanlder = async () => {   
    try {
      const token = Cookies.get("token");
      await logout(token);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div>
      <div className="navbar bg-sky-300 drop-shadow-lg">
        <div className="navbar-start">
          <p className=" ml-5 text-xl"><b> Management Book</b></p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/categorys">Category</Link>
            </li>
            <li>
              <Link href="/books">Book</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a onClick={logoutHanlder} className="btn bg-sky-300 border-sky-300">
            LOGOUT
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
