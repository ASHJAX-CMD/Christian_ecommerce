import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams(); // Extract product ID from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    tags: "",
    price: 0,
    compareAtPrice: 0,
    discount: 0,
    colors: "",
    sizes: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    featured: false
  });

  // Fetch product data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  // General change handler for text/number inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Edit existing product
      axios
        .patch(`http://localhost:5000/api/products/${id}`, product)
        .then(() => navigate("/admin/products"))
        .catch((err) => console.error(err));
    } else {
      // Add new product
      axios
        .post("http://localhost:5000/api/products", product)
        .then(() => navigate("/admin/products"))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="flex justify-center items-start min-h-full">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Info */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h3>
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
                  disabled
                  placeholder="Category"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  disabled
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

          {/* Pricing */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Pricing</h3>
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
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Product Variants</h3>
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

          {/* SEO & Visibility */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">SEO & Visibility</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="slug"
                value={product.slug}
                disabled
                placeholder="Custom URL Slug"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="metaTitle"
                value={product.metaTitle}
                disabled
                placeholder="Meta Title"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="metaDescription"
                value={product.metaDescription}
                disabled
                rows="2"
                placeholder="Meta Description"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
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
               <div className="flex gap-3 flex-wrap">
              {product.images?.map((img, j) => (
                <img
                  key={j}
                  src={`http://localhost:5000/uploads/${img}`}  // make sure your backend sends full URLs or prepend host
                  alt={product.name}
                  className="w-40 h-40 object-contain rounded-lg "
                />
              ))}
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {id ? "Save Changes" : "Add Product"}
          </button>
        
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
