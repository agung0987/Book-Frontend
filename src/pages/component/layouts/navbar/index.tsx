import Link from "next/link";

const Navbar = () => {
  return (
    <div>
       <nav className="flex bg-gray-800 py-2 px-5 justify-between">
        <h1 className="text-2xl text-white">Management Buku</h1>
        <ul className="flex mt-1 ">
          <Link className="mr-3 text-white cursor-pointer" href="/categorys">
            Category
          </Link>
          <Link className="mr-3 text-white cursor-pointer" href="/book">
            Book
          </Link>
        </ul>
      </nav> 
    </div>
  );
};

export default Navbar;
