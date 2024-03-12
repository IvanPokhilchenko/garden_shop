import React from 'react'
import './Modal.css';

function Modal({ closeModal }) {
  return (
<div className='basket-container'>
  <div className='modal'>
    <div className='modal-content'>
      <span className='close-btn' onClick={closeModal}>&times;</span>
      <h3 className='congratulations'>Congratulations!</h3>
      <p className='add'>Your order has been successfully placed on the website.</p>
      <p className='add'>A manager will contact you shortly to confirm your order.</p>
    </div>
  </div>
</div>
);
}

export default Modal