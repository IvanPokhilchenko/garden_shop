import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false); 
  const dispatch = useDispatch(); 
  const addedProducts = useSelector(state => state.cart.addedProducts); 


  useEffect(() => {
    fetchProduct(productId);

  }, [productId]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3333/products/${productId}`);
      setProduct(...response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };


  const addToCart = () => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (product && !addedProducts.includes(product.id) && product && !addedToCart) {

      const cartItem = { ...product, quantity: quantity };
      localStorage.setItem('cartItems', JSON.stringify([...savedCartItems, cartItem]));
      setAddedToCart(true);
    } else if (product && addedProducts.includes(product.id)) {
      // Если продукт уже добавлен, обновляем только количество
      const updatedCartItems = savedCartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setAddedToCart(true);
    }
  };

  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       {/* Hide container-all-products on screens narrower than 768px */}
      <div className="container-all-products" >
      {/* // style={{ display: window.innerWidth >= 768 ? 'none' : 'block' }} >*/}
        <Link className="det-text" to="/">Main page</Link>
        <div className="line"></div>
        <Link  className='det-text'to="/categories">Categories</Link>
        <div className="line"></div>
        <Link className="det-text" to={"/categories/:categoryId"}>Tools and equipment</Link>
        <div className="line"></div>
        <Link className="det-text-1" to={`/products/:productId`}>Secateurs</Link>
      </div>
      
      <div className="container-pr-detail" key={product.id}>

        <div className='container-img-dt'>
        <img   src={ "http://localhost:3333" + product.image} alt={product.title} />
        </div>

         <div className='container-detail'>
           
              <h2 className="pr-t">{product.title}</h2>
              <p className="pr-p">${product.price}</p>
              <p className="pr-d-p">${product.discount_price}</p>
          
         <div className='container-bt'>
          <div className="btn-1">
          <button className="btn1" onClick={() => handleQuantityChange(-1)}>-</button>
          <span className="btn2">{quantity}</span>
          <button className="btn1" onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <button className="btn" onClick={addToCart}>{addedToCart ? 'Added' : 'Add to Cart'}</button>
        </div>
        <p className='descr'>Description
           </p>
           <p className='descr1'>{product.description}</p>


         </div>
        
      </div>
     
    </div>
  );
};

export default ProductDetailPage;
