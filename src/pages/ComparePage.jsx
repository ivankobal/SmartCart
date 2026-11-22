import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './ComparePage.module.css';
import { useShop } from '../context/ShopContext.jsx';
import {
  analyzeComparison,
  sortComparisonItems,
} from '../utils/compareHelper.js';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCart } = useShop();
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const analysis = useMemo(() => analyzeComparison(compareList), [compareList]);

  const sortedItems = useMemo(
    () => sortComparisonItems(analysis.items, sortConfig),
    [analysis.items, sortConfig],
  );

  const handleSortClick = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return { key: null, direction: 'asc' };
      }
      return { key, direction: key === 'specs' ? 'desc' : 'asc' };
    });
  };

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return <span className={styles.sortInactive}>⇅</span>;
    }
    return (
      <span className={styles.sortActive}>
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <main className={styles.main}>
      <div className={styles.topBar}>
        <div className={styles.controls}>
          <Link to="/catalog" className={`${styles.btn} ${styles.btnWhite}`}>
            + Add Products
          </Link>

          <button
            className={`${styles.btn} ${styles.btnGreen}`}
            onClick={handleShare}
          >
            {copiedNotice ? '✓ Link Copied!' : 'Share Link'}
          </button>

          {compareList.length > 0 && (
            <button
              className={`${styles.btn} ${styles.btnDark}`}
              onClick={clearCompare}
            >
              Clear
            </button>
          )}

          {compareList.length > 1 && (
            <div
              className={styles.toggleWrapper}
              onClick={() => setOnlyDifferences((prev) => !prev)}
            >
              Only Differences
              <div
                className={`${styles.toggle} ${
                  onlyDifferences ? styles.toggleActive : ''
                }`}
              >
                <div
                  className={`${styles.toggleKnob} ${
                    onlyDifferences ? styles.toggleKnobActive : ''
                  }`}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.lastUpdated}>
          {compareList.length > 0
            ? `Comparing ${compareList.length} ${compareList.length === 1 ? 'item' : 'items'}`
            : 'No active comparison'}
        </div>
      </div>

      {compareList.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Comparison list is empty</h2>
          <p className={styles.emptyStateText}>
            Select two or more products in the catalog to compare their prices
            and specifications.
          </p>
          <Link to="/catalog" className={`${styles.btn} ${styles.btnGreen}`}>
            Go to Catalog
          </Link>
        </div>
      ) : (
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `210px repeat(${sortedItems.length}, minmax(240px, 320px))`,
          }}
        >
          <div>
            <div className={styles.matrixHeaderCard}>
              <div className={styles.matrixTitle}>Comparison Matrix</div>
              <div className={styles.matrixSubtitle}>
                Click row label to sort
              </div>
            </div>

            <div className={styles.attrList}>
              <div
                className={`${styles.attrLabel} ${styles.attrLabelSortable} ${
                  sortConfig.key === 'price' ? styles.attrLabelActive : ''
                }`}
                onClick={() => handleSortClick('price')}
                title="Sort by Price"
              >
                <span>Price & Advantage</span>
                {renderSortIndicator('price')}
              </div>

              {(!onlyDifferences || !analysis.hasSameCategory) && (
                <div
                  className={`${styles.attrLabel} ${styles.attrLabelSortable} ${
                    sortConfig.key === 'category' ? styles.attrLabelActive : ''
                  }`}
                  onClick={() => handleSortClick('category')}
                  title="Sort by Category (A-Z)"
                >
                  <span>Category (A-Z)</span>
                  {renderSortIndicator('category')}
                </div>
              )}

              {(!onlyDifferences || !analysis.hasSameBrand) && (
                <div
                  className={`${styles.attrLabel} ${styles.attrLabelSortable} ${
                    sortConfig.key === 'brand' ? styles.attrLabelActive : ''
                  }`}
                  onClick={() => handleSortClick('brand')}
                  title="Sort by Brand (A-Z)"
                >
                  <span>Brand (A-Z)</span>
                  {renderSortIndicator('brand')}
                </div>
              )}

              <div
                className={`${styles.attrLabel} ${styles.attrLabelSortable} ${
                  styles.attrLabelSpecs
                } ${sortConfig.key === 'specs' ? styles.attrLabelActive : ''}`}
                onClick={() => handleSortClick('specs')}
                title="Sort by Specs count"
              >
                <span>Key Specifications</span>
                {renderSortIndicator('specs')}
              </div>

              <div className={styles.attrLabel}>Action</div>
            </div>
          </div>

          {sortedItems.map((product) => (
            <div key={product.id}>
              <div className={styles.productHeader}>
                <button
                  className={styles.closeBtn}
                  onClick={() => removeFromCompare(product.id)}
                  title="Remove item"
                >
                  ✕
                </button>
                <img src={product.img} alt={product.title} />
                <div className={styles.productHeaderInfo}>
                  <h3>{product.title}</h3>
                  <p>
                    {product.price}
                    <br />
                    Brand: {product.brand || 'N/A'}
                  </p>
                </div>
              </div>

              <div className={styles.dataCol}>
                <div className={styles.dataCell}>
                  <div
                    className={`${styles.priceBox} ${
                      product.isBestPrice ? styles.priceBoxGreen : ''
                    }`}
                  >
                    <span>{product.price}</span>
                    {product.isBestPrice && (
                      <span className={styles.bestBadge}>Best price</span>
                    )}
                    {!product.isBestPrice && product.priceDiff > 0 && (
                      <span className={styles.priceDiff}>
                        +{product.priceDiff.toLocaleString('uk-UA')} ₴
                      </span>
                    )}
                  </div>
                </div>

                {(!onlyDifferences || !analysis.hasSameCategory) && (
                  <div className={`${styles.dataCell} ${styles.categoryCell}`}>
                    {product.category || 'Electronics'}
                  </div>
                )}

                {(!onlyDifferences || !analysis.hasSameBrand) && (
                  <div className={styles.dataCell}>
                    <span className={styles.boldText}>
                      {product.brand || 'N/A'}
                    </span>
                  </div>
                )}

                <div className={`${styles.dataCell} ${styles.specsCell}`}>
                  <ul className={styles.specsList}>
                    {product.parsedSpecs.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>

                <div className={`${styles.dataCell} ${styles.actionsCell}`}>
                  <Link
                    to={`/product/${product.id}`}
                    className={`${styles.btn} ${styles.btnDark}`}
                  >
                    Details
                  </Link>
                  <button
                    className={`${styles.btn} ${styles.btnWhite}`}
                    onClick={() => addToCart(product)}
                  >
                    Add to list
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
