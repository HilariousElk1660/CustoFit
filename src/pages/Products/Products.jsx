import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "./productData.jsx";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import "./Products.css";

export default function Products() {
  // const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/products", {
  //         headers: { Accept: "application/json" },
  //       });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data = await res.json();
  //       setProducts(data || []);
  //     } catch (e) {
  //       setError("Couldn't load products. Please try again.");
  //       console.error(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  const filteredProducts = products.filter((p) => {
    let matchesFilter = false;

    if (filter === "All") {
      matchesFilter = true;
    } else if (filter === "Customisable") {
      matchesFilter = p.customisable === true;
    } else if (p.category?.toLowerCase() === filter.toLowerCase()) {
      matchesFilter = true;
    } else if (p.tag?.toLowerCase() === filter.toLowerCase()) {
      matchesFilter = true;
    }

    const matchesSearch = (p.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const customisableProducts = filteredProducts.filter((p) => p.customisable);
  const nonCustomisableProducts = filteredProducts.filter(
    (p) => !p.customisable
  );

  const ProductCard = ({ product }) => (
    <div key={product.id} className="product-card">
      <img
        src={product.image || "/placeholder.jpg"}
        alt={product.name}
        className="product-image"
      />
      <Divider />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">R {Number(product.price || 0).toFixed(0)}</p>
      {product.tag && (
        <span className={`product-tag tag-${product.tag.toLowerCase()}`}>
          {product.tag}
        </span>
      )}
      <div className="product-actions">
        {product.customisable && (
          <Link to={`/design/${product.id}`} className="product-btn customize">
            Customise
          </Link>
        )}
        <button
          onClick={() => handleAddToCart(product.id)}
          className="product-btn add"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const handleAddToCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Product added to cart!");
    } catch (e) {
      alert("Couldn't add to cart.");
      console.error(e);
    }
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Our Collection</h1>
      <h1>Products</h1>
      <p className="products-subtitle">
        Browse our collection of clothing items. Select any product to start
        designing.
      </p>
      <div className="products-controls">
        <div className="products-search-container">
          <SearchIcon />
          <input
            className="products-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <FormControl>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Customisable">Customisable</MenuItem>
            <MenuItem value="Bestseller">Bestseller</MenuItem>
            <MenuItem value="Classic">Classic</MenuItem>
            <MenuItem value="Popular">Popular</MenuItem>
            <MenuItem value="Winter Collection">Winter Collection</MenuItem>
            <MenuItem value="Summer Essential">Summer Essential</MenuItem>
            <MenuItem value="Winter Essential">Winter Essential</MenuItem>
            <MenuItem value="Top">Top</MenuItem>
            <MenuItem value="Outerwear">Outerwear</MenuItem>
            <MenuItem value="Accessory">Accessory</MenuItem>
          </Select>
        </FormControl>
      </div>
      {customisableProducts.length > 0 && (
        <>
          <h1 className="products-title">Customisable Products</h1>
          <div className="products-grid">
            {customisableProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}

      {nonCustomisableProducts.length > 0 && (
        <>
          <h1 className="products-title">Anime Collection</h1>
          <div className="products-grid">
            {nonCustomisableProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}

      {filteredProducts.length === 0 && (
        <p className="products-subtitle">No products found.</p>
      )}
    </div>
  );
}
