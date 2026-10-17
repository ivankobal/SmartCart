import styles from './ComparePage.module.css';

export default function ComparePage() {
  return (
    <main className={styles.main}>
      {/* Верхня панель */}
      <div className={styles.topBar}>
        <div className={styles.controls}>
          <button className={`${styles.btn} ${styles.btnWhite}`}>
            Save Comparison
          </button>
          <button className={`${styles.btn} ${styles.btnGreen}`}>
            🔗 Share
          </button>
          <button className={`${styles.btn} ${styles.btnDark}`}>🗑 Clear</button>

          <div className={styles.toggleWrapper}>
            Compact View
            <div className={styles.toggle}>
              <div className={styles.toggleKnob}></div>
            </div>
          </div>
        </div>
        <div className={styles.lastUpdated}>Last updated: Today, 09:12 AM</div>
      </div>

      <div className={styles.grid}>
        {/* КОЛОНКА 1: Заголовки характеристик */}
        <div>
          {/* Пусте місце для вирівнювання з шапками товарів */}
          <div style={{ height: '84px', marginBottom: '24px' }}></div>

          <div className={styles.attrList}>
            <div className={styles.matrixTitle}>≡ Comparison Matrix</div>
            <div className={styles.attrLabel}>Attribute</div>
            <div className={styles.attrLabel}>Price</div>
            <div className={styles.attrLabel}>Brand</div>
            <div className={styles.attrLabel}>Key Specifications</div>
            <div className={styles.attrLabel}>Shipping</div>
            <div className={styles.attrLabel}>Seller Rating</div>
          </div>
        </div>

        {/* КОЛОНКА 2: Товар 1 */}
        <div>
          <div className={styles.productHeader}>
            <button className={styles.closeBtn}>✕</button>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80"
              alt="OrionX"
            />
            <div className={styles.productHeaderInfo}>
              <h3>OrionX Pro Headphones</h3>
              <p>
                $199.99
                <br />
                Brand: Stellaris Audio
              </p>
            </div>
          </div>
          <div className={styles.dataCol}>
            <div className={styles.dataTitle}>OrionX Pro Headphones</div>
            <div className={styles.dataCell}></div>
            <div className={styles.dataCell}>
              <div className={styles.priceBox}>$199.99</div>
            </div>
            <div className={styles.dataCell}>Stellaris Audio</div>
            <div className={styles.dataCell}>
              <span className={styles.boldText}>
                Almost good like Auralux...
              </span>
            </div>
            <div className={styles.dataCell}>Free 2-3 day shipping</div>
            <div className={styles.dataCell}>
              <span className={styles.rating}>★ 4.5</span>
            </div>
          </div>
        </div>

        {/* КОЛОНКА 3: Товар 2 */}
        <div>
          <div className={styles.productHeader}>
            <button className={styles.closeBtn}>✕</button>
            <img
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&q=80"
              alt="NovaCharge"
            />
            <div className={styles.productHeaderInfo}>
              <h3>NovaCharge 65W Charger</h3>
              <p>
                $49.50
                <br />
                Brand: VoltEdge
              </p>
            </div>
          </div>
          <div className={styles.dataCol}>
            <div className={styles.dataTitle}>NovaCharge 65W Charger</div>
            <div className={styles.dataCell}></div>
            <div className={styles.dataCell}>
              <div className={`${styles.priceBox} ${styles.priceBoxGreen}`}>
                $49.50
              </div>
            </div>
            <div className={styles.dataCell}>VoltEdge</div>
            <div className={styles.dataCell}>
              <span className={styles.boldText}>
                Good, but not really like Auralux...
              </span>
            </div>
            <div className={styles.dataCell}>Standard shipping: 3-5 days</div>
            <div className={styles.dataCell}>
              <span className={styles.rating}>★ 4.8</span> &nbsp;• VoltEdge
            </div>
          </div>
        </div>

        {/* КОЛОНКА 4: Товар 3 */}
        <div>
          <div className={styles.productHeader}>
            <button className={styles.closeBtn}>✕</button>
            <div className={styles.imagePlaceholder}>Image</div>
            <div className={styles.productHeaderInfo}>
              <h3>Auralux NC-7000 Wireless</h3>
              <p>
                $189.00
                <br />
                Brand: AstraTech
              </p>
            </div>
          </div>
          <div className={styles.dataCol}>
            <div className={styles.dataTitle}>Auralux NC-7000 Wireless</div>
            <div className={styles.dataCell}></div>
            <div className={styles.dataCell}>
              <div className={styles.priceBox}>$189.00</div>
            </div>
            <div className={styles.dataCell}>AstraTech</div>
            <div className={styles.dataCell}>
              <span className={styles.boldText}>As good as always!</span>
            </div>
            <div className={styles.dataCell}>Expedited shipping available</div>
            <div className={styles.dataCell}>
              <span className={styles.rating}>★ 4.3</span> &nbsp;• AstraTech
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
