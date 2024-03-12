import { Link } from "react-router-dom";
import styles from './Custom404Page.module.css'

export default function Custom404Page() {
  return (
    <section className={styles.wrapper}>
      <img src="/404.png" alt="Not found" />
      <h1>Page Not Found</h1>
      <p>
        We&apos;re sorry, the page you requested could not be found. Please go
        back to the homepage.
      </p>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </section>
  );
}
