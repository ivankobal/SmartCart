import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <NavLink to={'/home'} className={styles.logoIcon}>
            🛒
          </NavLink>
          <NavLink className={styles.brand} to={'/home'}>
            SmartCart
          </NavLink>
        </div>
        <nav className={styles.nav}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="/catalog"
          >
            Catalog
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="/compare"
          >
            Comparison builder
          </NavLink>

          <div className={styles.navItem}>
            <button
              className={`${styles.link} ${showFilters ? styles.active : ''}`}
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
        <NavLink className={styles.accountBtn} to="/auth">
          👤 Account
        </NavLink>

        <div className={styles.profileIcon}>
          <NavLink to={'/profile'}>👤</NavLink>
        </div>
      </div>
    </header>
  );
}
