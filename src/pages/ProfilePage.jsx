import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const token = localStorage.getItem('smartcart_token');
  const userName = localStorage.getItem('smartcart_user_name') || 'Гість';
  const userEmail =
    localStorage.getItem('smartcart_user_email') || 'не вказано';

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!token) {
    return (
      <main className={styles.main}>
        <div
          className={styles.section}
          style={{ textAlign: 'center', padding: '48px 24px' }}
        >
          <h2>Enter into account </h2>
          <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
            To view profile page and saved products authorize in system
          </p>
          <button onClick={() => navigate('/auth')} className={styles.btn}>
            Enter / Register
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>👤</div>
        <div>
          <h2>{userName}</h2>
          <p className={styles.email}>{userEmail}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Saved products</h3>
        You don't have any saved products yet
      </div>

      <button onClick={handleLogout} className={styles.logoutBtn}>
        Quit
      </button>
    </main>
  );
}
