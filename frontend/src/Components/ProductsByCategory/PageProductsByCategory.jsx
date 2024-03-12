import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsByCategory from './ProductsByCategory';

function PageProductsByCategory() {
  const { categoryId } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  return (
    <>
      <ProductsByCategory categoryId={selectedCategoryId} />
    </>
  );
}

export default PageProductsByCategory;
