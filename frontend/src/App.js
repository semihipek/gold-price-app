import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/products")
      .then((response) => {
        console.log("API Response:", response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const applyFilter = () => {
    axios
      .get(
        `http://127.0.0.1:5000/products/filter?min_price=${minPrice}&max_price=${maxPrice}`
      )
      .then((response) => {
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error filtering products:", error));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Product List</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={applyFilter}>
            Apply Filter
          </button>
        </div>
      </div>
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.images.rose}
                alt={`${product.name} Rose`}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">
                  <StarRatings
                    rating={product.popularityScore / 20}
                    starRatedColor="gold"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="5px"
                  />
                </p>
                <p className="card-text">Weight: {product.weight}g</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
