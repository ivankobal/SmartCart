import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const { signup, isAuthLoading } = useAuth();
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
    const result = await signup(formData);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.message);
    }

    if (!formData.name || !formData.email || !formData.password) {
      setError('Заповніть усі поля!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль має бути не менше 6 символів');
      return;
    }

    setError('');

    const success = await signup(formData);
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.authCard}>
        <div className={styles.icon}>🏠</div>

        <h1 className={styles.title}>Create SmartCart Account</h1>
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
            <span className={styles.inputIcon}>👤</span>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

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
              placeholder="Create a password"
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
            {isAuthLoading ? 'Creating account...' : 'Create account'}
          </button>

          <div className={styles.divider}>or</div>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnBlue}`}
            disabled={isAuthLoading}
          >
            Sign up with Microsoft
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnDark}`}
            disabled={isAuthLoading}
          >
            Sign up with Google
          </button>
        </form>
      </div>

      <div className={styles.bottomLink}>
        Already have an account?{' '}
        <NavLink className={styles.nav} to="/auth">
          Sign in
        </NavLink>
      </div>
    </main>
  );
}
