import products from '../data/products.js';
import styles from './CatalogPage.module.css';
import { Link } from 'react-router-dom';

export default function CatalogPage() {
  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumbs}>
        Home &gt; Electronics &gt; Catalog
      </nav>
      <h1 className={styles.pageTitle}>Electronics — Price Catalog</h1>

      <div className={styles.catalogGrid}>
        {products.map((p) => (
          <article key={p.id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              <img src={p.img} alt={p.title} />
            </div>
            <div className={styles.cardInfo}>
              <h2 className={styles.itemTitle}>{p.title}</h2>
              <p className={styles.itemSpecs}>{p.specs}</p>
              <p className={styles.itemPrice}>{p.price}</p>
            </div>
            <div className={styles.cardActions}>
              <label className={styles.compareLabel}>
                <input type="checkbox" /> Compare
              </label>
              <div className={styles.buttonGroup}>
                <div className={styles.btn}>
                  <Link
                    to={`/product/${p.id}`}
                    state={{ productData: p }}
                    className={styles.navLink}
                  >
                    View
                  </Link>
                </div>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  Add to list
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.paginationBar}>
        <div className={styles.paginationPills}>
          <button className={styles.pageDot}>1</button>
          <button className={styles.pageDot}>2</button>
          <button className={styles.pageDot}>&gt;</button>
        </div>
        <div className={styles.pageCounter}>Showing 12 of 124 items</div>
      </div>
    </main>
  );
}
