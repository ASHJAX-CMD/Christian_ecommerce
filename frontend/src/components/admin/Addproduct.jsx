import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { createProduct } from "../../slices/product";
const Addproduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    compareAtPrice: "",
    tags: "",
    category: "",
    brand: "",
    colors: "",
    sizes: "",
    images: [],
    video: null,
    slug: "",
    metaTitle: "",
    metaDescription: "",
    featured: false,
    status: "draft",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      price: Number(product.price),
      discount: Number(product.discount),
      compareAtPrice: Number(product.compareAtPrice),
      sizes: product.sizes ? product.sizes.split(",").map((s) => s.trim()) : [],
    };
    console.log(product);
    dispatch(createProduct(payload));
  };
  // Handle text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setProduct({ ...product, images: [...e.target.files] });
  };

  // Handle video upload
  const handleVideoChange = (e) => {
    setProduct({ ...product, video: e.target.files[0] });
  };

  // Submit handler
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   Object.keys(product).forEach((key) => {
  //     if (key === "images") {
  //       product.images.forEach((img) => formData.append("images", img));
  //     } else if (product[key]) {
  //       formData.append(key, product[key]);
  //     }
  //   });

  //   console.log("Submitted Product:", product);
  // };

  return (
    <div className="flex justify-center items-start min-h-full">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Basic Information
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                placeholder="Product Description"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                type="text"
                name="tags"
                value={product.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Media */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Media</h3>
            <div className="space-y-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />

              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Pricing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Selling Price"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="number"
                name="compareAtPrice"
                value={product.compareAtPrice}
                onChange={handleChange}
                placeholder="Compare at Price (MRP)"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Discount (%)"
              className="w-full mt-4 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </section>

          {/* Variants */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Product Variants
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="colors"
                value={product.colors}
                onChange={handleChange}
                placeholder="Colors (comma separated)"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="sizes"
                value={product.sizes}
                onChange={handleChange}
                placeholder="Sizes (S, M, L, XL)"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* SEO & Admin */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              SEO & Visibility
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="slug"
                value={product.slug}
                onChange={handleChange}
                placeholder="Custom URL Slug"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="metaTitle"
                value={product.metaTitle}
                onChange={handleChange}
                placeholder="Meta Title"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                name="metaDescription"
                value={product.metaDescription}
                onChange={handleChange}
                rows="2"
                placeholder="Meta Description"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={product.featured}
                    onChange={handleChange}
                  />
                  Featured Product
                </label>
              </div>
            </div>
          </section>

          <button
            type="submit"
            // onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
