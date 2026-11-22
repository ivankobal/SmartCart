import { useState } from 'react';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.authCard}>
        <div className={styles.icon}>🏠</div>

        <h1 className={styles.title}>
          {isSignUp ? 'Create your account' : 'Sign in to SmartCart'}
        </h1>
        <p className={styles.subtitle}>
          {isSignUp
            ? 'Join SmartCart to save comparisons, track prices and get the most out of our platform.'
            : 'Use your account to quickly sign in and enable live price comparisons.'}
        </p>

        {isSignUp ? (
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
        ) : (
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
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </button>
            <button
              className={`${styles.btn} ${styles.btnDark}`}
              style={{ marginTop: '8px' }}
            >
              Use another account
            </button>
          </div>
        )}
      </div>

      <div className={styles.bottomLink}>
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <a onClick={() => setIsSignUp(false)}>Sign in</a>
          </>
        ) : (
          <>
            Need help? <a href="#contact">Contact us</a>
          </>
        )}
      </div>
    </main>
  );
}
