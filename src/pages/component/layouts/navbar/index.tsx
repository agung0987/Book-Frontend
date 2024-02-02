import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import Router from "next/router";

const Navbar = () => {
  const logoutHanlder = async () => {
    const token = Cookies.get('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post(`http://127.0.0.1:3000/api/logout`).then(() => {
      Cookies.remove("token");
      Router.push("/");
    });
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
