import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import ListProduct from "../components/ListProduct";
import EditProduct from "../components/EditProduct";

const Admin = () => {
  return (
    <div className="md:flex ">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />}>
        </Route>
          <Route path="/editProduct/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
};
export default Admin;
