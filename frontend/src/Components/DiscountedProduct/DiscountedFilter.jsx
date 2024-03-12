import React from 'react'
import './DiscountedFilter.css'


function DiscountedFilter({ sortBy, setSortBy, filterByDiscount, filterByPriceRange, setFilterByPriceRange }) {

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilterByPriceRange(prevRange => ({ ...prevRange, [name]: value }));
  };

  return (
    <div className="product-filter">
       <div>
        <label>Price</label>
        <input type="number" name="min" placeholder='from' onChange={handlePriceRangeChange} />
        <input type="number" name="max" placeholder='to' onChange={handlePriceRangeChange} />
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

export default DiscountedFilter


