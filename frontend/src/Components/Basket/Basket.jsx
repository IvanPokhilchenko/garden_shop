import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import './Basket.css';
import Modal from './Modal';
import axios from 'axios';


const Basket = () => {
  const { register, handleSubmit, formState: { errors }, reset} = useForm();
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);




  useEffect(() => {   
    // Проверка на наличие сохраненных товаров при загрузке компонента Basket
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Загрузка сохраненных товаров в корзину
    storedItems.forEach((item) => {
      if(
        items.filter((currentItem) => currentItem.id === item.id).length === 0
      ){ 
        dispatch({ type: 'ADD_TO_CART', payload: item })
    }
    });
  }, [dispatch]);


  const calculateTotal = () => {
    return items.reduce((total, item) => {
      if (item.discont_price) {
        // Если есть дисконтная цена, суммируем ее
        return total + (item.discont_price * item.quantity);
      } else {
        // Иначе суммируем обычную цену
        return total + (item.price * item.quantity);
      }
    }, 0);
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });

     // Удаление товара из LocalStorage при удалении из корзины
     const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
     const updatedItems = storedItems.filter(item => item.id !== itemId);
     localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      // Если количество меньше или равно нулю, удаляем товар из корзины
      removeFromCart(itemId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity: newQuantity } });

      // Обновление количества товара в LocalStorage
      const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedItems = storedItems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }  
  };

  const continueShopping = () => {
    window.location.href = '/products';
  };

  const openModal = () => {
   // Проверяем валидность формы
   handleSubmit(onSubmit)();
   let isFormValid = true;
  // Проверяем, есть ли ошибки валидации в каждом поле
  Object.values(errors).forEach(error => {
    if (error.message.length > 0) {
      isFormValid = false;
    }
  });
   // Если форма валидна, открываем модальное окно
   if (isFormValid) {
     setIsModalOpen(true);
   }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  if (!items || items.length === 0) {
    return (
      <div className="shopping-cart-empty">
         <div className='shop'>
          <h2 className='shopping-c'>Shopping cart</h2>
          <div className='lines'></div>
          <Link to={`/products`} className="all-text">Back to the store</Link>
        </div>
        <p className='looks'>Looks like you have no items in your basket currently.</p>
        <button className='continue-btn' onClick={continueShopping}>Continue Shopping</button>
      </div>
    );
  }
  const onSubmit = async (data) => {
    try {
      // Отправка данных заказа на сервер
      const response = await axios.post('http://localhost:3333/order/send', data);
  
      if (response.status === 200) {
        setIsModalOpen(true);
        reset();
      } else {
        throw new Error('Failed to send order');
      }
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  const handleModalClose = () => {
    items.forEach(item => removeFromCart(item.id));
    setIsModalOpen(false);
  };
  return (
    <>
    <div className='shop-order'>
          <h2 className='shopping-c'>Shopping cart</h2>
          <div className='lines'></div>
          <Link to={`/products`} className="all-text">Back to the store</Link>
      </div>
    <div className="shopping-cart">
      <div className="cart-items">
        {items.map((item, index) => (
          <div className="cart-item" key={index}>
            <div className="item-details">
              <img src={"http://localhost:3333" + item.image} alt={item.title} />
              <div className="item-info">
                <div className='item-title'>
                <p>{item.title}</p>
                </div>
                <div className="quantity">
                  <button className='counter' onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <p className='number'>{item.quantity}</p>
                  <button className='counter' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <div className="item-price">
              {item.discont_price && (
            <p className="dis-price">
              ${item.discont_price}
            </p>
          )}
          <p className={item.discont_price ? "orig-price discounted" : "orig-price" }>
            ${item.price}
          </p>
              <button className='remove' onClick={() => removeFromCart(item.id)}>&times;</button>
            </div>
                </div>
                
              </div>
            </div>
            
          </div>
        ))}
      </div>
      <div className="order-details">
        <div className='inform'>
        <h3 className='order-h3'>Order details</h3>
        <p>{items.reduce((total, item) => total + item.quantity, 0)} items</p>
        <p>Total: ${calculateTotal()}</p>
        </div>
        <form className="user-details" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" name='name' placeholder="Name" {...register("name", { required: "This input is required", minLength: {value: 3, message: "Minimum length is 3 symbols"}, maxLength: {value: 20, message: "Maximum length is 20 symbols"}, })} />
          <div>{ errors.name && <p>{errors.name.message}</p> }</div>
          <input type="text" name='phone' placeholder="Phone number" {...register("phone", { required: "This input is required", minLength: {value: 3, message: "Minimum length is 3 symbols"}, maxLength: {value: 20, message: "Maximum length is 20 symbols"}, })}/>
          <div>{ errors.phone && <p>{errors.phone.message}</p> }</div>
          <input type="email" name='email' placeholder="Email" {...register("email", { required: "This input is required", minLength: {value: 3, message: "Minimum length is 3 symbols"}, maxLength: {value: 40, message: "Maximum length is 20 symbols"}, })}/>
          <div>{ errors.email && <p>{errors.email.message}</p> }</div>
          <button className='order' onClick={openModal}>Order</button>
        </form>
      </div>
      </div>
      {isModalOpen && <Modal closeModal={handleModalClose} />}
    </>
  );
};

export default Basket;
