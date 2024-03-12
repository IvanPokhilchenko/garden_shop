import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CategoriesList.module.css";

function CategoriesList({ limit = Infinity }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3333/categories/all");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  return (
    <ul className={styles.categories_lists}>
      {categories.slice(0, limit).map((category) => (
        <li key={category.id} className={styles.category_item}>
          <Link to={`/categories/${category.id}`} state="category">
            <div className={styles.img_wrapper}>
              <img
                src={`http://localhost:3333${category.image}`}
                alt={category.title}
              />
            </div>
            <h3 className={styles.category_title}>{category.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CategoriesList;
