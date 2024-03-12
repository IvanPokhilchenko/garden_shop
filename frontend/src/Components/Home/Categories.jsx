import { Link } from "react-router-dom";
import CategoriesList from "../CategoriesList/CategoriesList";
import "./Categories.css";

function Categories() {
  const handleClick = () => {
    // Перенаправление на страницу категорий
    window.location.href = '/categories';
};
  return (
    <div className="cont">
      <div className="containers">
        <p className="categories-text">Categories</p>
        <div className="line"></div>
        <Link className="all-text" to="/categories" onClick={handleClick}><span>All categories</span></Link>
      </div>

      <div className="cont">
        <CategoriesList limit={4} />
      </div>
    </div>
  );
}

export default Categories;
