import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { storageService } from '../services/storageService';
import { useShop } from '../context/ShopContext.jsx';
import styles from './ProfilePage.module.css';
import { UserIcon } from '../modules/components/Icons.jsx';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { cart, cartSummary, removeFromCart } = useShop();

  const user = storageService.getUser();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user) {
    return (
      <main className={styles.main}>
        <div className={`${styles.section} ${styles.authPrompt}`}>
          <h2>Sign in to Your Account</h2>
          <p className={styles.authPromptText}>
            Authorize in the system to view your profile and saved products.
          </p>
          <button onClick={() => navigate('/auth')} className={styles.btn}>
            Sign In / Register
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          <UserIcon size={28} />
        </div>
        <div>
          <h2>{user.name}</h2>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Saved Products ({cartSummary.totalItems})</h3>
          {cart.length > 0 && (
            <span className={styles.totalBadge}>
              Total: {cartSummary.formattedTotal}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div>
            <p className={styles.emptyText}>
              You don't have any saved products yet.
            </p>
            <Link to="/catalog" className={styles.btn}>
              Browse Catalog
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemLeft}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className={styles.itemImg}
                    />
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className={styles.itemTitle}
                      >
                        {item.title}
                      </Link>
                      <p className={styles.price}>
                        {item.price} × {item.quantity} pcs
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.sectionFooter}>
              <Link to="/cart" className={styles.btn}>
                Edit Cart
              </Link>
              <Link to="/checkout" className={styles.checkoutLink}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>

      <button onClick={handleLogout} className={styles.logoutBtn}>
        Sign Out
      </button>
    </main>
  );
}
