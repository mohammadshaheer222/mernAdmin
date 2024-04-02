import logo from "/src/assets/logo.svg";
import profile from "/src/assets/profile.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-2 bg-gray-200 fixed left-0 right-0 top-0">
      <div>
        <img width={60} src={logo} alt="logo" />
      </div>
      <div className="font-bold md:text-xl uppercase tracking-widest text-gray-600">
        Admin Panel
      </div>
      <div>
        <img className="h-12 w-12 rounded-full" src={profile} alt="profile" />
      </div>
    </nav>
  );
};
export default Navbar;
