import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { CATALOG_SECTIONS } from '../data/catalogStructure.js';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/catalog');
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>SmartCart — Best Price Aggregator</h1>
        <p className={styles.subtitle}>
          Compare prices across electronics, home appliances, groceries, and
          everyday essentials in one place.
        </p>

        <form onSubmit={handleSearch} className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search products (e.g., Lavazza, Sony, Dyson...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.btnPrimary}>
            Search
          </button>
        </form>
      </section>

      <h2 className={styles.sectionTitle}>Catalog Sections</h2>

      <div className={styles.categoriesDeck}>
        {CATALOG_SECTIONS.map((sec) => (
          <Link
            key={sec.id}
            to={`/catalog?section=${sec.id}`}
            className={styles.card}
          >
            <h3>{sec.title}</h3>
            <p>{sec.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
