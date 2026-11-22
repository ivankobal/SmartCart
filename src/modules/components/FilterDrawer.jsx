import { useState, useMemo } from 'react';
import styles from './FilterDrawer.module.css';
import {
  CATALOG_SECTIONS,
  ALL_CATEGORIES,
  ALL_BRANDS,
} from '../../data/catalogStructure.js';
import { CloseIcon } from './Icons.jsx';

function FilterDrawerContent({ onClose, activeFilters, onApply }) {
  const [localSections, setLocalSections] = useState(
    activeFilters.sections || [],
  );
  const [localCategories, setLocalCategories] = useState(
    activeFilters.categories || [],
  );
  const [localBrands, setLocalBrands] = useState(activeFilters.brands || []);
  const [minPrice, setMinPrice] = useState(activeFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(activeFilters.maxPrice || '');
  const [sort, setSort] = useState(activeFilters.sort || '');

  const visibleCategories = useMemo(() => {
    if (localSections.length === 0) return ALL_CATEGORIES;
    return ALL_CATEGORIES.filter((cat) =>
      localSections.includes(cat.sectionId),
    );
  }, [localSections]);

  const visibleBrands = useMemo(() => {
    if (localSections.length === 0) return ALL_BRANDS;
    const brandsSet = new Set(
      CATALOG_SECTIONS.filter((sec) => localSections.includes(sec.id)).flatMap(
        (sec) => sec.brands,
      ),
    );
    return Array.from(brandsSet);
  }, [localSections]);

  const toggleSection = (secId) => {
    setLocalSections((prev) => {
      const nextSections = prev.includes(secId)
        ? prev.filter((s) => s !== secId)
        : [...prev, secId];

      if (nextSections.length > 0) {
        const allowedCatIds = new Set(
          ALL_CATEGORIES.filter((c) => nextSections.includes(c.sectionId)).map(
            (c) => c.id,
          ),
        );
        setLocalCategories((cats) => cats.filter((c) => allowedCatIds.has(c)));
      }
      return nextSections;
    });
  };

  const toggleCategory = (catId) => {
    setLocalCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId],
    );
  };

  const toggleBrand = (brand) => {
    setLocalBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const handleApply = () => {
    onApply({
      sections: localSections,
      categories: localCategories,
      brands: localBrands,
      minPrice: minPrice ? Number(minPrice) : '',
      maxPrice: maxPrice ? Number(maxPrice) : '',
      sort,
    });
    onClose();
  };

  const handleReset = () => {
    onApply({
      sections: [],
      categories: [],
      brands: [],
      minPrice: '',
      maxPrice: '',
      sort: '',
    });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Filters & Sorting</h2>
          <button className={styles.closeBtn} onClick={onClose} title="Close">
            <CloseIcon size={14} />
          </button>
        </div>

        <div className={styles.body}>
          <div>
            <h3 className={styles.sectionTitle}>Sort By</h3>
            <div className={styles.chipsGrid}>
              {[
                { id: '', label: 'Default' },
                { id: 'price_asc', label: 'Price: Low → High' },
                { id: 'price_desc', label: 'Price: High → Low' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`${styles.chip} ${sort === opt.id ? styles.chipActive : ''}`}
                  onClick={() => setSort(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Sections</h3>
            <div className={styles.chipsGrid}>
              {CATALOG_SECTIONS.map((sec) => {
                const isSelected = localSections.includes(sec.id);
                return (
                  <button
                    key={sec.id}
                    type="button"
                    className={`${styles.chip} ${isSelected ? styles.chipActive : ''}`}
                    onClick={() => toggleSection(sec.id)}
                  >
                    {sec.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Subcategories</h3>
            <div className={styles.chipsGrid}>
              {visibleCategories.map((cat) => {
                const isSelected = localCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`${styles.chip} ${isSelected ? styles.chipActive : ''}`}
                    onClick={() => toggleCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Price Range (₴)</h3>
            <div className={styles.priceRow}>
              <input
                type="number"
                placeholder="From"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className={styles.priceInput}
                min="0"
              />
              <span className={styles.priceSeparator}>—</span>
              <input
                type="number"
                placeholder="To"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={styles.priceInput}
                min="0"
              />
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Brands</h3>
            <div className={styles.checkboxList}>
              {visibleBrands.map((brand) => (
                <label key={brand} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    checked={localBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btnReset}
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className={styles.btnApply}
            onClick={handleApply}
          >
            Show results
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function FilterDrawer({
  isOpen,
  onClose,
  activeFilters,
  onApply,
}) {
  if (!isOpen) return null;
  return (
    <FilterDrawerContent
      onClose={onClose}
      activeFilters={activeFilters}
      onApply={onApply}
    />
  );
}
