import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import './RandomProducts.css'
import '../cardStyles.css'
import { useDispatch } from 'react-redux';


function RandomProducts() {
  const [randomProducts, setRandomProducts] = useState([]);
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
    fetchRandomProducts();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchRandomProducts = async () => {
    try {
      const response = await fetch('http://localhost:3333/products/all');
      const data = await response.json();
      const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 4);
      setRandomProducts(randomProducts);
    } catch (error) {
      console.error('Ошибка при загрузке случайных товаров:', error);
    }
  };

  const handleClick = () => {
    // Перенаправление на страницу категорий
    window.location.href = '/discounted';
};
  

  return (
      <div className='random-products'>
        <div className='containers'>
          <h2 className='categories-text'>Sale</h2>
          <div className='line'></div>
          <Link className="all-text" to="/categories" onClick={handleClick}><span>All sales</span></Link>
        </div>

          {/* <Link className='products-list'></Link> */}
          <div className='products-list'>
          {/* Объединяем товары из сервера и локальные образцы товаров и отображаем их */}
          {[...randomProducts].map(product => (
            <Link key={product.id}  to={`/products/${product.id}`}>
            <div className='product-item'>
              <div className='product-image'>
                {/* Отображаем изображение товара */}
                <img src={"http://localhost:3333" + product.image} alt={product.title} />
                <button className='add-to-cart-button image-button' onClick={(e) => {
      e.preventDefault();
      addToCart(product);
    }}>Add to Cart</button>
                {/* В данном случае можно добавить информацию о скидке */}
                {product.discont_price && (
                  <span className='discount-percent'>
                    {`-${Math.round((1 - (product.discont_price / product.price)) * 100)}% `}
                  </span>
                )}
              </div>
              <div className='product-details'>
  <h3 className='product-title'>{product.title}</h3>
  <div className='price-container'>
    {/* Отображаем цену со скидкой, если она есть */}
    {product.discont_price && (
      <p className='discount-price'>${product.discont_price}</p>
    )}
    {/* Отображаем оригинальную цену товара */}
    <p className={product.discont_price ? 'original-price discounted' : 'original-price'}>
      ${product.price}
    </p>
  </div>
</div>
            </div>
            </Link>
          ))}
        </div>
      </div>
  )
}


export default RandomProducts
