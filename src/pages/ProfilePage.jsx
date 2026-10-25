import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>👤</div>
        <div>
          <h2>Іван Кобаль</h2>
          <p className={styles.email}>ivan.kobal@example.com</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Збережені товари</h3>
        <div className={styles.itemList}>
          <div className={styles.item}>
            <div>
              <h4>Sony WH-1000XM5 Beige</h4>
              <p className={styles.price}>₴ 14 999</p>
            </div>
            <button
              onClick={() => navigate('/product/1')}
              className={styles.btn}
            >
              Переглянути
            </button>
          </div>

          <div className={styles.item}>
            <div>
              <h4>Dell XPS 13 Plus 9320</h4>
              <p className={styles.price}>₴ 58 999</p>
            </div>
            <button
              onClick={() => navigate('/product/3')}
              className={styles.btn}
            >
              Переглянути
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/auth')} className={styles.logoutBtn}>
        Вийти з акаунта
      </button>
    </main>
  );
}
