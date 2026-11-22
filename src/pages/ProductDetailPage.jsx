import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage({ product, goBack }) {
  const sellers = [
    {
      name: 'SoundWorld Marketplace',
      info: 'Ships in 1-2 days • Free returns',
      price: product.price,
      bg: '#ec4899',
      icon: '🛍️',
    },
    {
      name: 'ElectroDirect',
      info: 'Ships in 2-4 days • $5 shipping',
      price: product.price,
      bg: '#10b981',
      icon: '💳',
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.breadcrumbs}>
        <span onClick={goBack} style={{ cursor: 'pointer', color: '#10b981' }}>
          Home
        </span>{' '}
        &gt;
        <span onClick={goBack} style={{ cursor: 'pointer', color: '#10b981' }}>
          {' '}
          Electronics
        </span>{' '}
        &gt;
        <span> {product.title}</span>
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
            <span>2 sellers</span>
          </div>

          <div className={styles.sellerList}>
            {sellers.map((s, idx) => (
              <div key={idx} className={styles.sellerCard}>
                <div className={styles.sellerLeft}>
                  <div
                    className={styles.sellerIcon}
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className={styles.sellerName}>{s.name}</div>
                    <div className={styles.sellerDetails}>{s.info}</div>
                  </div>
                </div>
                <div className={styles.sellerRight}>
                  <div className={styles.sellerPrice}>{s.price}</div>
                  <button className={styles.visitBtn}>Visit</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={`${styles.btn} ${styles.btnCompare}`}>
              Compare
            </button>
            <button className={`${styles.btn} ${styles.btnAdd}`}>
              Add to list
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
