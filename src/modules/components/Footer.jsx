import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerCol}>
          <h5>Electronics Catalog</h5>
          <p>
            Comprehensive price monitoring and cross-shop product aggregator
            database.
          </p>
        </div>
        <div className={styles.footerCol}>
          <h5>Categories</h5>
          <ul>
            <li>
              <a href="#audio">Audio &amp; Headphones</a>
            </li>
            <li>
              <a href="#laptops">Laptops &amp; PC</a>
            </li>
            <li>
              <a href="#smartphones">Smartphones</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h5>Support &amp; Legal</h5>
          <ul>
            <li>
              <a href="#terms">Terms &amp; Privacy</a>
            </li>
            <li>
              <a href="#api">API Documentation</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
