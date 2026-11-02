import { useState } from 'react';
import styles from './ComparePage.module.css';

const initialProducts = [
  {
    id: 1,
    title: 'OrionX Pro Headphones',
    brand: 'Stellaris Audio',
    price: '$199.99',
    isBestPrice: false,
    specs: 'Almost good like Auralux...',
    shipping: 'Free 2-3 day shipping',
    rating: '4.5',
    img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'NovaCharge 65W Charger',
    brand: 'VoltEdge',
    price: '$49.50',
    isBestPrice: true,
    specs: 'Good, but not really like Auralux...',
    shipping: 'Standard shipping: 3-5 days',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Auralux NC-7000 Wireless',
    brand: 'AstraTech',
    price: '$189.00',
    isBestPrice: false,
    specs: 'As good as always!',
    shipping: 'Expedited shipping available',
    rating: '4.3',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
  },
];

export default function ComparePage() {
  const [products, setProducts] = useState(initialProducts);

  const handleRemove = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleClear = () => {
    setProducts([]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.topBar}>
        <div className={styles.controls}>
          <button className={`${styles.btn} ${styles.btnWhite}`}>
            Save Comparison
          </button>
          <button className={`${styles.btn} ${styles.btnGreen}`}>
            🔗 Share
          </button>
          <button
            className={`${styles.btn} ${styles.btnDark}`}
            onClick={handleClear}
          >
            🗑 Clear
          </button>

          <div className={styles.toggleWrapper}>
            Compact View
            <div className={styles.toggle}>
              <div className={styles.toggleKnob}></div>
            </div>
          </div>
        </div>
        <div className={styles.lastUpdated}>Last updated: Today, 09:12 AM</div>
      </div>

      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Список порівняння порожній</h2>
          <p>Додайте товари з каталогу, щоб порівняти їхні характеристики.</p>
        </div>
      ) : (
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `200px repeat(${products.length}, minmax(220px, 320px))`,
          }}
        >
          <div>
            <div className={styles.matrixHeaderCard}>
              <div className={styles.matrixTitle}>≡ Comparison Matrix</div>
              <div className={styles.matrixSubtitle}>
                {products.length} items selected
              </div>
            </div>

            <div className={styles.attrList}>
              <div className={styles.attrLabel}>Price</div>
              <div className={styles.attrLabel}>Brand</div>
              <div className={styles.attrLabel}>Key Specifications</div>
              <div className={styles.attrLabel}>Shipping</div>
              <div className={styles.attrLabel}>Seller Rating</div>
            </div>
          </div>

          {products.map((product) => (
            <div key={product.id}>
              <div className={styles.productHeader}>
                <button
                  className={styles.closeBtn}
                  onClick={() => handleRemove(product.id)}
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
                    Brand: {product.brand}
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
                    {product.price}
                  </div>
                </div>
                <div className={styles.dataCell}>{product.brand}</div>
                <div className={styles.dataCell}>
                  <span className={styles.boldText}>{product.specs}</span>
                </div>
                <div className={styles.dataCell}>{product.shipping}</div>
                <div className={styles.dataCell}>
                  <span className={styles.rating}>★ {product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
