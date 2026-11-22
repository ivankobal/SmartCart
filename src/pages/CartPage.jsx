import { Link } from 'react-router-dom';
import styles from './CartPage.module.css';
import { useShop } from '../context/ShopContext.jsx';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartSummary } =
    useShop();

  return (
    <main className={styles.main}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>
          Shopping Cart ({cartSummary.totalItems})
        </h1>

        {cart.length > 0 && (
          <button onClick={clearCart} className={styles.clearBtn}>
            🗑 Clear cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Your shopping cart is empty</h2>
          <p>
            Add products from the catalog or comparison matrix to place an
            order.
          </p>
          <Link to="/catalog" className={styles.catalogLink}>
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.itemsList}>
            {cart.map((item) => (
              <article key={item.id} className={styles.cartItem}>
                <img
                  src={item.img}
                  alt={item.title}
                  className={styles.itemImg}
                />

                <div className={styles.itemInfo}>
                  <Link to={`/product/${item.id}`} className={styles.itemTitle}>
                    {item.title}
                  </Link>
                  <p className={styles.itemMeta}>
                    {item.brand ? `${item.brand} • ` : ''}
                    {item.specs}
                  </p>
                  <p className={styles.itemPrice}>{item.price}</p>
                </div>

                <div className={styles.qtyControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, -1)}
                    title="Decrease quantity"
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, 1)}
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  title="Remove from cart"
                >
                  ✕
                </button>
              </article>
            ))}
          </div>

          <aside className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Selected items:</span>
              <span>{cartSummary.totalItems} pcs</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Estimated delivery:</span>
              <span className={styles.freeDelivery}>Free</span>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total:</span>
              <span>{cartSummary.formattedTotal}</span>
            </div>

            <Link to="/checkout" className={styles.checkoutBtn}>
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
