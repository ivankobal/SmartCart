import { useState, useEffect, useRef } from 'react';
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import styles from './Header.module.css';
import { useShop } from '../../context/ShopContext.jsx';
import { storageService } from '../../services/storageService.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { CartIcon, SearchIcon, UserIcon, CloseIcon } from './Icons.jsx';

export default function Header() {
  const location = useLocation();
  const isAuthenticated = !!storageService.getToken();

  const { compareList, cartSummary } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);

  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchQuery(urlSearch);
  }

  const debouncedQuery = useDebounce(searchQuery, 350);
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (location.pathname === '/catalog') {
      const nextParams = new URLSearchParams(searchParams);
      const trimmed = debouncedQuery.trim();

      if (trimmed) {
        nextParams.set('search', trimmed);
      } else {
        nextParams.delete('search');
      }

      if (nextParams.toString() !== searchParams.toString()) {
        setSearchParams(nextParams, { replace: true });
      }
    }
  }, [debouncedQuery, location.pathname, searchParams, setSearchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    const nextParams = new URLSearchParams(
      location.pathname === '/catalog' ? searchParams : '',
    );

    if (trimmed) {
      nextParams.set('search', trimmed);
    } else {
      nextParams.delete('search');
    }

    const queryString = nextParams.toString();
    navigate(`/catalog${queryString ? `?${queryString}` : ''}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (location.pathname === '/catalog') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('search');
      setSearchParams(nextParams, { replace: true });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <NavLink
            to="/home"
            className={styles.logoIcon}
            aria-label="SmartCart Home"
          >
            <CartIcon size={15} />
          </NavLink>
          <NavLink className={styles.brand} to="/home">
            SmartCart
          </NavLink>
        </div>

        <nav className={styles.nav}>
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
            {compareList.length > 0 && (
              <span className={styles.badge}>{compareList.length}</span>
            )}
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="/cart"
          >
            Cart
            {cartSummary.totalItems > 0 && (
              <span className={styles.badge}>{cartSummary.totalItems}</span>
            )}
          </NavLink>
        </nav>
      </div>

      <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
        <span className={styles.searchIcon}>
          <SearchIcon size={14} />
        </span>
        <input
          type="text"
          placeholder="Search products, models or brands"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBar}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className={styles.clearSearchBtn}
            title="Clear search"
          >
            <CloseIcon size={10} />
          </button>
        )}
      </form>

      <div className={styles.rightSection}>
        {isAuthenticated ? (
          <NavLink to="/profile" className={styles.profileIcon} title="Profile">
            <UserIcon size={15} />
          </NavLink>
        ) : (
          <NavLink className={styles.accountBtn} to="/auth">
            <UserIcon size={14} />
            <span>Account</span>
          </NavLink>
        )}
      </div>
    </header>
  );
}
