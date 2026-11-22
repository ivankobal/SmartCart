import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './CatalogPage.module.css';
import { useProducts } from '../hooks/useProducts';
import { useShop } from '../context/ShopContext.jsx';
import FilterDrawer from '../modules/components/FilterDrawer.jsx';
import { CATALOG_SECTIONS } from '../data/catalogStructure.js';
import { FilterIcon } from '../modules/components/Icons.jsx';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const queryString = searchParams.toString();

  const activeFilters = useMemo(() => {
    const current = new URLSearchParams(queryString);
    return {
      search: current.get('search') || '',
      sections: current.getAll('section'),
      categories: current.getAll('category'),
      brands: current.getAll('brand'),
      minPrice: current.get('minPrice') || '',
      maxPrice: current.get('maxPrice') || '',
      sort: current.get('sort') || '',
    };
  }, [queryString]);

  const activeFilterCount =
    activeFilters.sections.length +
    activeFilters.categories.length +
    activeFilters.brands.length +
    (activeFilters.minPrice ? 1 : 0) +
    (activeFilters.maxPrice ? 1 : 0) +
    (activeFilters.sort ? 1 : 0);

  const handleQuickSectionSelect = (sectionId) => {
    const params = new URLSearchParams();
    if (activeFilters.search) params.set('search', activeFilters.search);
    if (sectionId) {
      params.append('section', sectionId);
    }
    setSearchParams(params);
  };

  const handleApplyFilters = (newFilters) => {
    const params = new URLSearchParams();
    if (activeFilters.search) params.set('search', activeFilters.search);
    if (newFilters.minPrice)
      params.set('minPrice', String(newFilters.minPrice));
    if (newFilters.maxPrice)
      params.set('maxPrice', String(newFilters.maxPrice));
    if (newFilters.sort) params.set('sort', newFilters.sort);

    newFilters.sections?.forEach((s) => params.append('section', s));
    newFilters.categories?.forEach((c) => params.append('category', c));
    newFilters.brands?.forEach((b) => params.append('brand', b));

    setSearchParams(params);
  };

  const handleResetAll = () => {
    setSearchParams({});
  };

  const { products, isLoading, error } = useProducts(activeFilters);
  const { compareList, addToCompare, removeFromCompare, addToCart } = useShop();

  const isCompared = (productId) => compareList.some((p) => p.id === productId);

  const handleCompareToggle = (product) => {
    if (isCompared(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const activeSectionObj =
    activeFilters.sections.length === 1
      ? CATALOG_SECTIONS.find((s) => s.id === activeFilters.sections[0])
      : null;

  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumbs}>
        Home &gt; Catalog{' '}
        {activeSectionObj ? `> ${activeSectionObj.shortTitle}` : ''}
      </nav>

      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>
          {activeFilters.search
            ? `Search results for "${activeFilters.search}"`
            : activeSectionObj
              ? `${activeSectionObj.title} — Price Catalog`
              : 'All Products — Price Catalog'}
        </h1>

        <div className={styles.headerActions}>
          {(activeFilterCount > 0 || activeFilters.search) && (
            <button onClick={handleResetAll} className={styles.clearAllBtn}>
              Clear all
            </button>
          )}

          <button
            onClick={() => setIsDrawerOpen(true)}
            className={styles.filterBtn}
          >
            <FilterIcon size={15} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className={styles.filterBadge}>{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className={styles.sectionsBar}>
        <button
          onClick={() => handleQuickSectionSelect('')}
          className={`${styles.sectionPill} ${
            activeFilters.sections.length === 0 ? styles.sectionPillActive : ''
          }`}
        >
          All Sections
        </button>

        {CATALOG_SECTIONS.map((sec) => {
          const isSelected = activeFilters.sections.includes(sec.id);
          return (
            <button
              key={sec.id}
              onClick={() => handleQuickSectionSelect(sec.id)}
              className={`${styles.sectionPill} ${
                isSelected ? styles.sectionPillActive : ''
              }`}
            >
              {sec.title}
            </button>
          );
        })}
      </div>

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeFilters={activeFilters}
        onApply={handleApplyFilters}
      />

      {isLoading && (
        <h2 className={styles.statusLoading}>Getting products...</h2>
      )}

      {error && <h2 className={styles.statusError}>{error}</h2>}

      {!isLoading && !error && products.length === 0 && (
        <div className={styles.emptyState}>
          <h3>No products found matching your criteria</h3>
          <button
            onClick={handleResetAll}
            className={`${styles.btn} ${styles.btnPrimary} ${styles.emptyStateBtn}`}
          >
            Clear filters
          </button>
        </div>
      )}

      {!isLoading && !error && products.length > 0 && (
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
                  <input
                    type="checkbox"
                    checked={isCompared(p.id)}
                    onChange={() => handleCompareToggle(p)}
                  />{' '}
                  Compare
                </label>
                <div className={styles.buttonGroup}>
                  <div className={styles.btn}>
                    <Link to={`/product/${p.id}`} className={styles.navLink}>
                      View
                    </Link>
                  </div>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => addToCart(p)}
                  >
                    Add to list
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className={styles.paginationBar}>
        <div className={styles.paginationPills}>
          <button className={styles.pageDot}>1</button>
        </div>
        <div className={styles.pageCounter}>
          Showing {products.length} items
        </div>
      </div>
    </main>
  );
}
