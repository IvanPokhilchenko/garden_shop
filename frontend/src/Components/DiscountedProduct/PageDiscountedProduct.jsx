import React, { useState, useEffect } from 'react'
import DiscountedProduct from './DiscountedProduct';
import './DiscountedProduct.css';
import '../cardStyles.css';
import { Link } from "react-router-dom";
import DiscountedFilter from './DiscountedFilter';

function PageDiscountedProduct() {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [filterByDiscount, setFilterByDiscount] = useState(false);
  const [filterByPriceRange, setFilterByPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    fetchDiscountedProducts();
  }, [sortBy, filterByDiscount, filterByPriceRange]);

  const fetchDiscountedProducts = async () => {
    try {
      const response = await fetch('http://localhost:3333/products/all');
      const data = await response.json();
      // Фильтруем продукты, у которых есть скидка
       let filteredProducts = data.filter(product => product.discont_price);

       // Фильтрация по ценовому диапазону
       filteredProducts = filteredProducts.filter(product => product.price >= filterByPriceRange.min && product.price <= filterByPriceRange.max);
 
       // Сортировка продуктов
       if (sortBy === 'newest') {
         filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
       } else if (sortBy === 'price-high-low') {
         filteredProducts.sort((a, b) => b.price - a.price);
       } else if (sortBy === 'price-low-high') {
         filteredProducts.sort((a, b) => a.price - b.price);
       }

      setDiscountedProducts(filteredProducts);
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  };


  return (
    <div>
         <div  className='container-all-products'>
      <Link className="det-text" to="/">Main page</Link>
          <div className="line"></div>
       <Link  className='det-texts'to="/discounted">All sales</Link>
      </div>
    <h2 className='discounted-h2'>Discounted items</h2>
    <DiscountedFilter
     sortBy={sortBy}
     setSortBy={setSortBy}
     filterByDiscount={filterByDiscount}
     setFilterByDiscount={setFilterByDiscount}
     filterByPriceRange={filterByPriceRange}
     setFilterByPriceRange={setFilterByPriceRange} 
     />
    <div className="products-list">
      {discountedProducts.map(product => (
      <Link key={product.id} to={`/products/${product.id}`}>
        <DiscountedProduct  product={product} />
      </Link>
      ))}
    </div>
  </div>
  );
}

export default PageDiscountedProduct