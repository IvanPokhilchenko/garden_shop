import React from 'react';
import './ProductFilter.css';

function ProductFilter({ sortBy, setSortBy, filterByDiscount, setFilterByDiscount, filterByPriceRange, setFilterByPriceRange }) {

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleDiscountFilterChange = (e) => {
    setFilterByDiscount(e.target.checked);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilterByPriceRange(prevRange => ({ ...prevRange, [name]: value }));
  };

  return (
    <div className="product-filter">
       <div className='filter-by-price'>
        <label>Price</label>
        <input type="number" name="min" placeholder='from' onChange={handlePriceRangeChange} />
        <input type="number" name="max" placeholder='to' onChange={handlePriceRangeChange} />
      </div>
      <div>
        <label>Discounted items</label>
        <input type="checkbox" className='checkbox' checked={filterByDiscount} onChange={handleDiscountFilterChange} />
      </div>
      <label>Sorted</label>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="newest">Newest</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="price-low-high">Price: Low to High</option>
      </select>

     
    </div>
  );
}

export default ProductFilter;
