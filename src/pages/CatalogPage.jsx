import styles from './CatalogPage.module.css';

const products = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Beige',
    specs: 'Active Noise Cancelling / 30h Batt.',
    price: '₴ 14 999',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Apple Watch Series 9 GPS',
    specs: 'Midnight Aluminum / Sport Band',
    price: '₴ 17 499',
    img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Dell XPS 13 Plus 9320',
    specs: 'Intel i7 / 16GB / 512GB SSD',
    price: '₴ 58 999',
    img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'LG UltraFine 27" 4K IPS',
    specs: 'USB-C PD 90W / HDR 400',
    price: '₴ 19 800',
    img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'HyperX Cloud II Pro',
    specs: '7.1 Virtual Surround / Detachable Mic',
    price: '₴ 3 499',
    img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Keychron K2 V2 Wireless',
    specs: 'Gateron Brown / RGB Backlight',
    price: '₴ 4 199',
    img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 7,
    title: 'Logitech MX Master 3S',
    specs: 'Quiet Clicks / 8K DPI Sensor',
    price: '₴ 4 699',
    img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 8,
    title: 'Apple iPad Air M2 11"',
    specs: 'Wi-Fi 128GB / Starlight',
    price: '₴ 29 999',
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 9,
    title: 'Google Pixel 8 Pro',
    specs: '128GB / Obsidian / Tensor G3',
    price: '₴ 34 500',
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 10,
    title: 'Fujifilm X-T30 II Kit',
    specs: 'XC 15-45mm Lens / 26.1MP',
    price: '₴ 43 999',
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 11,
    title: 'Marshall Emberton II',
    specs: 'Portable Bluetooth / Black and Brass',
    price: '₴ 6 799',
    img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 12,
    title: 'Samsung Galaxy Fit 3',
    specs: 'AMOLED 1.6" / 13 Days Battery',
    price: '₴ 2 299',
    img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80',
  },
];

export default function CatalogPage({ onSelectProduct }) {
  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumbs}>
        Home &gt; Electronics &gt; Price Catalog
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
                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => onSelectProduct(p)}
                >
                  {' '}
                  View
                </button>
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
