import { Link } from 'react-router-dom';
import styles from './AuthPage.module.css';
export default function AuthPage() {
  return (
    <main className={styles.main}>
      <div className={styles.authCard}>
        <div className={styles.icon}>🏠</div>

        <h1 className={styles.title}>Sign in to SmartCart</h1>

        <p className={styles.subtitle}>
          Use your account to quickly sign in and enable live price comparisons
        </p>

        <div className={styles.form}>
          <button className={`${styles.btn} ${styles.btnWhite}`}>
            Sign in with Google
          </button>

          <button className={`${styles.btn} ${styles.btnBlue}`}>
            Sign in with Microsoft
          </button>

          <div className={styles.divider}>or</div>

          <button
            className={`${styles.btn} ${styles.btnDark}`}
            style={{ marginTop: '8px' }}
          >
            Use another account
          </button>

          <Link className={styles.nav} to="/signup">
            Sign up
          </Link>
        </div>
      </div>
      <div className={styles.bottomLink}>
        <>
          Need help? <a href="#contact">Contact us</a>
        </>
      </div>
    </main>
  );
}
