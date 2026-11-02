import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const { login, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Заповніть усі поля!');
      return;
    }

    setError('');

    // Передаємо введені дані в хук
    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.message);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.authCard}>
        <div className={styles.icon}>🏠</div>

        <h1 className={styles.title}>Sign in to SmartCart</h1>
        <p className={styles.subtitle}>
          Use your account to quickly sign in and enable live price comparisons
        </p>

        {error && (
          <div
            style={{ color: '#ef4444', fontSize: '14px', marginBottom: '10px' }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <button
            type="submit"
            className={`${styles.btn} ${styles.btnWhite}`}
            style={{ marginTop: '10px' }}
            disabled={isAuthLoading}
          >
            {isAuthLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className={styles.divider}>or</div>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnBlue}`}
            disabled={isAuthLoading}
          >
            Sign in with Microsoft
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnDark}`}
            disabled={isAuthLoading}
          >
            Sign in with Google
          </button>
        </form>
      </div>

      <div className={styles.bottomLink}>
        Don't have an account?{' '}
        <NavLink className={styles.nav} to="/signup">
          Sign up
        </NavLink>
      </div>
    </main>
  );
}
