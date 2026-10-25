import styles from './RegisterPage.module.css';
import { NavLink } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <div className={styles.authCard}>
        <div className={styles.icon}>🏠</div>

        <h1 className={styles.title}>Sign in to SmartCart</h1>
        <p className={styles.subtitle}>
          Use your account to quickly sign in and enable live price comparisons
        </p>

        <div className={styles.form}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>👤</span>
            <input
              type="text"
              placeholder="Full name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>✉️</span>
            <input
              type="email"
              placeholder="Email address"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🔒</span>
            <input
              type="password"
              placeholder="Create a password"
              className={styles.inputField}
            />
          </div>
          <button
            className={`${styles.btn} ${styles.btnWhite}`}
            style={{ marginTop: '10px' }}
          >
            Create account
          </button>
          <div className={styles.divider}>or</div>
          <button className={`${styles.btn} ${styles.btnBlue}`}>
            Sign up with Microsoft
          </button>
          <button className={`${styles.btn} ${styles.btnDark}`}>
            Sign up with Google
          </button>
        </div>
      </div>

      <div className={styles.bottomLink}>
        <>
          Already have an account?
          <NavLink className={styles.nav} to="/auth">
            Sign up
          </NavLink>
        </>
      </div>
    </main>
  );
}
