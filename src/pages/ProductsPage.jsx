import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/products/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const productsData = await response.json();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //using memo
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedFilter === "" || product.category === selectedFilter)
      );
    });
  }, [products, searchQuery, selectedFilter]);

  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-wrap items-start  mx-2 my-4 md:mx-16 md:my-4  ">
        <div className="mb-2  w-full md:w-1/2 lg:w-1/4 ">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded focus:outline-none w-full md:mt-0 mt-16 "
          />
        </div>
        <div className=" relative md:ml-4 w-full md:w-1/2 lg:w-1/4 mt-4 md:mt-0  z-10">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded focus:outline-none appearance-none w-full "
          >
            <option value="">Category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <i className="fas fa-caret-down"></i>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
