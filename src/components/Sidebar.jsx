import { Link } from "react-router-dom";
import addProduct from "/src/assets/addproduct.png";
import listProduct from "/src/assets/productlist.png";

const Sidebar = () => {
  return (
    <div className="px-4 md:px-8 flex items-center justify-center gap-x-2 gap-y-5 pt-20 pb-4 w-full sm:gap-x-4 md:flex-col md:pt-36 md:max-w-60 md:h-screen md:justify-start md:pl-6 bg-gray-100">
      <Link to="/addproduct">
        <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 sm:px-0 sm:py-0 sm:h-14 sm:w-44 bg-gray-300">
          <img src={addProduct} alt="add-product" width={40} />
          <span className="font-semibold">Add Product</span>
        </button>
      </Link>
      <Link to="/listproduct">
        <button className="flex items-center justify-center gap-2 rounded-md  bg-gray-300 px-4 py-2 sm:px-0 sm:py-0 sm:h-14 sm:w-44">
          <img src={listProduct} alt="list-product" width={20} />
          <span className="font-semibold">Product List</span>
        </button>
      </Link>
    </div>
  );
};
export default Sidebar;
