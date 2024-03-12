import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import { ADD_TO_CART } from '../redux/types';

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const addedProducts = useSelector(state => state.cart.addedProducts);

  const addToCart = async (productId) => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (productId && !addedProducts.includes(productId)) {
      const product = await fetchProduct(productId);
      if (product) {
        const cartItem = { ...product, quantity: 1 };
        localStorage.setItem('cartItems', JSON.stringify([...savedCartItems, cartItem]));
        dispatch({ type: 'ADD_TO_CART', payload: productId });
      }
    }
  };

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3333/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  return addToCart;
};