import { useState } from "react";
import axios from "axios";
import upload_area from "../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorImage, setErrorImage] = useState("");

  const imageHandler = async (event) => {
    const files = event.target.files;
    setImage(Array.from(files));
    setErrorImage("");
  };

  const changeHandler = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });
    setErrorMessage("");
  };

  const addProduct = async (event) => {
    event.preventDefault();
    if (productDetails.category === "") {
      setErrorMessage("Please Select an Option");
      return;
    }
    if (!image) {
      setErrorImage("Please select a foto");
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    await axios
      .post("http://localhost:2000/api/v1/allproducts/upload", formData)
      .then((res) => {
        productDetails.image = res.data.image;

        return axios
          .post("http://localhost:2000/api/v1/allproducts/", productDetails)
          .then((res) => {
            console.log(res);
            alert("product added");
            setProductDetails({
              name: "",
              image: "",
              category: "",
              new_price: "",
              old_price: "",
            });
            setImage("");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-8 sm:px-6 box-border w-full mt-4 md:pt-20 md:m-7">
      <form onSubmit={addProduct}>
        <div className="mb-3">
          <h1 className="font-semibold pb-2">Product Title</h1>
          <input
            onChange={changeHandler}
            value={productDetails.name}
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
            value={productDetails.old_price}
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
            value={productDetails.new_price}
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
            value={productDetails.category}
            name="category"
            className="bg-gray-200 outline-none rounded-md p-1 cursor-pointer"
            required
          >
            <option value=".."></option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="file-input" className="cursor-pointer" required>
            <div className="flex gap-4">
              {image.length > 0 ? (
                image.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`product-${index}`}
                    width={100}
                  />
                ))
              ) : (
                <img src={upload_area} alt="product" width={100} />
              )}
            </div>
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            multiple
            hidden
          />
          {errorImage && <div className="text-red-500">{errorImage}</div>}
        </div>

        <input
          className="bg-black text-white cursor-pointer flex items-center justify-center gap-x-2 px-4 py-2 w-full max-w-80 rounded-md"
          type="submit"
          value="Add Product"
        />
      </form>
    </div>
  );
};

export default AddProduct;
