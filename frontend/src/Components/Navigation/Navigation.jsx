import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styles from "./Navigation.module.css";

export const Navigation = ({ ...other }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <HashLink className={styles.nav_link} smooth to="/#home" {...other}>
            Main Page
          </HashLink>
        </li>
        <li>
          <NavLink
            className={styles.nav_link}
            to="/categories"
            state="sale"
            {...other}
          >
            Categories
          </NavLink>
        </li>
        <li>
          <HashLink
            className={styles.nav_link}
            smooth
            to="/products"
            state="all"
            {...other}
          >
            All products
          </HashLink>
        </li>
        <li>
          <NavLink
            className={styles.nav_link}
            to="/discounted"
            state="sale"
            {...other}
          >
            All sales
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
