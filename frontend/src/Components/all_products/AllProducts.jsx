import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './AllProducts.css';
import '../cardStyles.css';
import ProductFilter from '../ProductsByCategory/ProductFilter';
import { useDispatch } from 'react-redux';


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [filterByDiscount, setFilterByDiscount] = useState(false);
  const [filterByPriceRange, setFilterByPriceRange] = useState({ min: 0, max: 1000 });
  const dispatch = useDispatch(); 
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const addToCart = (product) => {
    
    const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    // Если товар уже существует в корзине, увеличьте количество
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCartItems);
    dispatch({ type: 'UPDATE_QUANTITY', payload: updatedCartItems });

  } else {
    // Если товар не существует в корзине, добавьте его с количеством 1
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });

  }
  };


  useEffect(() => {
    fetchProducts();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [sortBy, filterByDiscount, filterByPriceRange, cartItems]);


 
    const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3333/products/all');
    const data = await response.data;

    let sortedProducts = [...data];
    if (filterByDiscount) {
      sortedProducts = sortedProducts.filter(product => product.discont_price);
    }
    sortedProducts = sortedProducts.filter(product => product.price >= filterByPriceRange.min && product.price <= filterByPriceRange.max);

    // Apply sorting
    if (sortBy === 'newest') {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-high-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-low-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    
    setProducts(sortedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


  return (
    <div className='wrapper-all-p'>
    <div className='cont-all-products'>
      <div  className='container-all-products'>
      <Link className="det-text" to="/">Main page</Link>
          <div className="line"></div>
       <Link  className='det-texts'to="/products">All products</Link>
      </div>
      <h1 className='products-h2'>All products</h1>
      <div>
      <ProductFilter
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterByDiscount={filterByDiscount}
          setFilterByDiscount={setFilterByDiscount}
          filterByPriceRange={filterByPriceRange}
          setFilterByPriceRange={setFilterByPriceRange}
        />
      </div>
      <div className='products-list'>
        {products.map((product) => (
          <div className='product-item' key={product.id}>

        
             <Link to={`/products/${product.id}`} >
              {product.name}
             <div className='product-image'>
                <img src={`http://localhost:3333${product.image}`} alt={product.title} />
                <button  className='add-to-cart-button image-button' onClick={(e) => {
      e.preventDefault();
      addToCart(product);
    }}>Add to Cart</button>
                {product.discont_price && (
                  <span className='discount-percent'>
                    {`-${Math.round((1 - (product.discont_price / product.price)) * 100)}% `}
                  </span>
                )}
              </div>

              <div className='product-details'>
           <h3 className='product-title'>{product.title}</h3>
           <div className='price-container'>
               {product.discont_price && (
           <p className='discount-price'>${product.discont_price}</p>
               )}
           <p className={product.discont_price ? 'original-price discounted' : 'original-price'}>
               ${product.price}
    </p>
  </div>
</div>

          </Link> 
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default AllProducts;
