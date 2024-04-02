import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom"

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    await axios
      .get("http://localhost:2000/api/v1/allproducts")
      .then((res) => setAllProducts(res.data.product));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const removeProduct = async (id) => {
    await axios
      .delete(`http://localhost:2000/api/v1/allproducts/${id}`)
      .then((res) => {
        alert("Do you want to remove this product?");
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  
  return (
    <div className="p-2 box-border mb-0 w-full mt-4 sm:p-4 sm:m-7 md:pt-20">
      <h1 className="font-bold text-xl uppercase px-4 md:px-2 py-2">
        Products List
      </h1>
      <div className="max-h-[77vh] overflow-auto px-4 md:px-2 text-center">
        <table className="w-full mx-auto">
          <thead>
            <tr className="text-start py-12 bg-gray-200">
              <th className="p-2">Products</th>
              <th className="p-2">Title</th>
              <th className="p-2">Old Price</th>
              <th className="p-2">Offer Price</th>
              <th className="p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr
                key={product._id}
                className="border-b border-slate-900/20 text-gray-700 p-8"
              >
                <div className="flex w-64">
                  {product.image.map((img) => (
                    <td className="flex justify-center">
                      <img src={img} alt="product" width={60} className="p-2" />
                    </td>
                  ))}
                </div>
                <td>
                  <div className="line-clamp-3">{product.name}</div>
                </td>
                <td>
                  <div className="flex justify-center">
                    ${product.old_price}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">
                    ${product.new_price}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">{product.category}</div>
                </td>
                <td>
                  <div className="flex justify-center items-center gap-x-4">
                    <TbTrash size={20}
                      className="text-red-500 scale-100 hover:scale-110 cursor-pointer text-lg"
                      onClick={() => removeProduct(product._id)}
                    />
                    <Link to={`/editProduct/${product._id}`}
                      className="bg-blue-500 text-white px-4 py-2"
                    >
                      update
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
