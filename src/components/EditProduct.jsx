import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import upload_area from "../assets/upload_area.svg";

const EditProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
    image: [],
  });
  const [image, setImage] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/v1/allproducts/${id}`)
      .then((res) => setSingleProduct(res.data.product))
      .catch((error) => console.log(error));
  }, [id]);

  const changeHandler = (event) => {
    setSingleProduct({
      ...singleProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImage(Array.from(files));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    axios
      .post("http://localhost:2000/api/v1/allproducts/upload", formData)
      .then((res) => {
        singleProduct.image = res.data.image;

        return axios
          .patch(
            `http://localhost:2000/api/v1/allproducts/${id}`,
            singleProduct
          )
          .then((res) => alert("Successfully Updated.."))
          .catch((error) => console.log(error));
      });
  };
  return (
    <form className="pt-36 px-14" onSubmit={submitHandler}>
      <div className="mb-3">
        <h1 className="font-semibold pb-2">Product Title</h1>
        <input
          onChange={changeHandler}
          value={singleProduct.name}
          className="bg-gray-200 outline-none
         max-w-80 w-full py-3 px-4 rounded-md"
          type="text"
          name="name"
          placeholder="Type here.."
          required
        />
      </div>
      <div className="mb-3">
        <h1 className="font-semibold pb-2">Old Price</h1>
        <input
          onChange={changeHandler}
          value={singleProduct.old_price}
          className="bg-gray-200 outline-none
         max-w-80 w-full py-3 px-4 rounded-md"
          type="number"
          name="old_price"
          placeholder="Type here.."
          required
        />
      </div>
      <div className="mb-3">
        <h1 className="font-semibold pb-2">Offer Price</h1>
        <input
          onChange={changeHandler}
          value={singleProduct.new_price}
          className="bg-gray-200 outline-none
         max-w-80 w-full py-3 px-4 rounded-md"
          type="number"
          name="new_price"
          placeholder="Type here.."
          required
        />
      </div>
      <div className="mb-3 flex items-center gap-x-4">
        <h1 className="font-semibold">Product Category :</h1>
        <select
          onChange={changeHandler}
          value={singleProduct.category}
          name="category"
          className="bg-gray-200 outline-none rounded-md p-1 cursor-pointer"
          required
        >
          <option value=".."></option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="file-input" className="cursor-pointer" required>
          <div className="flex gap-4 w-24 h-24">
            {image.length > 0 ? (
              image.map((file,index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`product}`}
                />
              ))
            ) : singleProduct.image.length > 0 ? (
              singleProduct.image.map((file,index) => (
                <img key={index} src={file} alt={`product`} />
              ))
            ) : (
              <img src={upload_area} alt="product" />
            )}
          </div>
        </label>
        <input
          onChange={handleImageChange}
          type="file"
          name="image"
          id="file-input"
          multiple
          hidden
        />
      </div>

      <input
        className="bg-black text-white cursor-pointer flex items-center justify-center gap-x-2 px-4 py-2 w-full max-w-80 rounded-md"
        type="submit"
        value="Update Product"
      />
    </form>
  );
};

export default EditProduct;
