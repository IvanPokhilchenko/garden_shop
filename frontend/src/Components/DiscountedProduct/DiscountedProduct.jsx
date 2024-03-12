import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


function DiscountedProduct({ product }) {
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
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="product-item"   >
      <div className="product-image">
        <img
          src={"http://localhost:3333" + product.image}
          alt={product.title}
        />
        <button className='add-to-cart-button image-button' onClick={(e) => {
      e.preventDefault();
      addToCart(product);
    }}>Add to Cart</button>
        {product.discont_price && (
          <span className="discount-percent">
            {`-${Math.round(
              (1 - product.discont_price / product.price) * 100
            )}% `}
          </span>
        )}
      </div>
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <div className="price-container">
          {product.discont_price && (
            <p className="discount-price">
              ${product.discont_price}
            </p>
          )}
          <p
            className={
              product.discont_price
                ? "original-price discounted"
                : "original-price"
            }
          >
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DiscountedProduct;
