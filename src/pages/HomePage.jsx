import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const categories = [
  { id: 'smartphones', title: '📱 smartphones', count: '1,240 products' },
  { id: 'laptops', title: '💻 laptops', count: '850 products' },
  { id: 'headphones', title: '🎧 headphones', count: '620 products' },
  { id: 'watches', title: '⌚ watches', count: '410 products' },
  { id: 'tv', title: '📺 TV', count: '310 products' },
  { id: 'audio', title: '🔊 audio', count: '190 products' },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>SmartCart — Пошук кращих цін</h1>
        <p className={styles.subtitle}>
          Порівнюйте ціни на електроніку у сотнях магазинів та обирайте
          найвигідніші пропозиції.
        </p>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Пошук товарів (наприклад, Sony, iPad...)"
            className={styles.input}
          />
          <Link to="/catalog" className={styles.btnPrimary}>
            До каталогу
          </Link>
        </div>
      </section>

      <h2 className={styles.sectionTitle}>Популярні категорії</h2>

      <div className={styles.categoriesDeck}>
        {categories.map((cat) => (
          <Link key={cat.id} to="/catalog" className={styles.card}>
            <h3>{cat.title}</h3>
            <p>{cat.count}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
