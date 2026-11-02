import { useState } from 'react';
import styles from './Header.module.css';

export default function Header({ activePage, setActivePage }) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo} onClick={() => setActivePage('catalog')}>
          <div className={styles.logoIcon}>🛒</div>
          SmartCart
        </div>
        <nav className={styles.nav}>
          <button
            className={`${styles.navLink} ${activePage === 'catalog' ? styles.activeLink : ''}`}
            onClick={() => {
              setActivePage('catalog');
              setShowFilters(false);
            }}
          >
            Catalog
          </button>
          <button
            className={`${styles.navLink} ${activePage === 'compare' ? styles.activeLink : ''}`}
            onClick={() => {
              setActivePage('compare');
              setShowFilters(false);
            }}
          >
            Comparison Builder
          </button>

          {/* Кнопка Filters з випадаючим віконцем */}
          <div className={styles.navItem}>
            <button
              className={`${styles.navLink} ${showFilters ? styles.activeLink : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {showFilters ? '▴' : '▾'}
            </button>

            {showFilters && (
              <div className={styles.filtersDropdown}>
                <div className={styles.filterGroup}>
                  <h4>Sort by Price</h4>
                  <label className={styles.filterLabel}>
                    <input type="radio" name="sort" /> Low to High
                  </label>
                  <label className={styles.filterLabel}>
                    <input type="radio" name="sort" /> High to Low
                  </label>
                </div>
                <div className={styles.filterGroup}>
                  <h4>Availability</h4>
                  <label className={styles.filterLabel}>
                    <input type="checkbox" /> In Stock Only
                  </label>
                  <label className={styles.filterLabel}>
                    <input type="checkbox" /> Free Shipping
                  </label>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products, models or brands"
          className={styles.searchBar}
        />
      </div>

      <div className={styles.rightSection}>
        <button
          className={styles.accountBtn}
          onClick={() => setActivePage('auth')}
        >
          👤 Account
        </button>
        <div
          className={styles.profileIcon}
          onClick={() => setActivePage('auth')}
          title="Profile"
        >
          👤
        </div>
      </div>
    </header>
  );
}
