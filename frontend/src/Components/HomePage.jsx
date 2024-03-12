import React from "react";
import Discount from "./Home/Discount";
import RandomProducts from "./Home/RandomProducts";
import DiscountForm from "./Home/DiscountForm";
import Categories from "./Home/Categories";

function HomePage() {
  return (
    <>
      <Discount />
      <Categories />
      <DiscountForm />
      <RandomProducts />
    </>
  );
}

export default HomePage;
