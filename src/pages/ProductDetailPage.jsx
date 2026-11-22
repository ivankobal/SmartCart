import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailPage.module.css';
import { useProduct } from '../hooks/useProduct.js';
import { useShop } from '../context/ShopContext.jsx';
import { getSellersForProduct } from '../utils/sellerHelper.js';
import { CATALOG_SECTIONS } from '../data/catalogStructure.js';

const VARIANT_CLASS_MAP = {
  pink: styles.sellerPink,
  emerald: styles.sellerEmerald,
  blue: styles.sellerBlue,
  amber: styles.sellerAmber,
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useProduct(id);
  const { compareList, addToCompare, removeFromCompare, addToCart } = useShop();

  const sellers = useMemo(() => getSellersForProduct(product), [product]);

  if (!product) {
    return (
      <main className={styles.main}>
        <h2>Loading product #{id} or product not found...</h2>
        <button onClick={() => navigate('/catalog')} className={styles.btn}>
          ← Back to Catalog
        </button>
      </main>
    );
  }

  const isCompared = compareList.some((p) => p.id === product.id);

  const sectionObj = CATALOG_SECTIONS.find((s) => s.id === product.section);
  const sectionLabel = sectionObj ? sectionObj.shortTitle : 'Catalog';

  const handleCompareToggle = () => {
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.breadcrumbs}>
        <span
          onClick={() => navigate('/home')}
          className={styles.breadcrumbLink}
        >
          Home
        </span>{' '}
        &gt;{' '}
        <span
          onClick={() =>
            navigate(
              product.section
                ? `/catalog?section=${product.section}`
                : '/catalog',
            )
          }
          className={styles.breadcrumbLink}
        >
          {sectionLabel}
        </span>{' '}
        &gt; <span>{product.title}</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={product.img} alt={product.title} />
          </div>
          <div className={styles.thumbnails}>
            <div className={`${styles.thumb} ${styles.thumbActive}`}>
              <img src={product.img} alt="1" />
            </div>
          </div>
        </div>

        <div>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.meta}>{product.specs}</div>
          <div className={styles.badge}>Best choice for this price!</div>

          <div className={styles.sectionHeader}>
            <span>Price comparison</span>
            <span>{sellers.length} sellers</span>
          </div>

          <div className={styles.sellerList}>
            {sellers.map((s, idx) => (
              <div key={idx} className={styles.sellerCard}>
                <div className={styles.sellerLeft}>
                  <div
                    className={`${styles.sellerIcon} ${
                      VARIANT_CLASS_MAP[s.variant] || styles.sellerEmerald
                    }`}
                  >
                    {s.badge}
                  </div>
                  <div>
                    <div className={styles.sellerName}>{s.name}</div>
                    <div className={styles.sellerDetails}>{s.info}</div>
                  </div>
                </div>
                <div className={styles.sellerRight}>
                  <div className={styles.sellerPrice}>{s.price}</div>
                  <button
                    className={styles.visitBtn}
                    onClick={() => {
                      addToCart({
                        ...product,
                        price: s.price,
                        numericPrice: s.numericPrice,
                      });
                      navigate('/cart');
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.btn} ${styles.btnCompare}`}
              onClick={handleCompareToggle}
            >
              {isCompared ? 'In Comparison' : 'Compare'}
            </button>
            <button
              className={`${styles.btn} ${styles.btnAdd}`}
              onClick={() => addToCart(product)}
            >
              Add to list
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
