import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CheckoutPage.module.css';
import { useShop } from '../context/ShopContext.jsx';
import { storageService } from '../services/storageService.js';
import { CheckCircleIcon } from '../modules/components/Icons.jsx';

export default function CheckoutPage() {
  const { cart, cartSummary, clearCart } = useShop();
  const savedUser = storageService.getUser();

  const [formData, setFormData] = useState({
    fullName: savedUser?.name || '',
    email: savedUser?.email || '',
    phone: '',
    city: '',
    address: '',
    deliveryMethod: 'nova_poshta',
    paymentMethod: 'card',
  });

  const [error, setError] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim() ||
      !formData.address.trim()
    ) {
      setError('Please fill in all required shipping fields.');
      return;
    }

    setError('');
    const randomOrderCode = `SC-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(randomOrderCode);
    clearCart();
  };

  if (confirmedOrderId) {
    return (
      <main className={styles.main}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <CheckCircleIcon size={44} />
          </div>
          <h2>Order Successfully Placed!</h2>
          <div className={styles.orderNumber}>Order ID: {confirmedOrderId}</div>
          <p>
            Thank you, <strong>{formData.fullName}</strong>! We have sent the
            order details and seller links to{' '}
            <strong>{formData.email || formData.phone}</strong>.
          </p>
          <div className={styles.successActions}>
            <Link to="/profile" className={styles.btnSecondary}>
              Go to Profile
            </Link>
            <Link to="/catalog" className={styles.btnPrimaryLink}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.successState}>
          <h2>Your cart is empty</h2>
          <p>Add products from the catalog before proceeding to checkout.</p>
          <div className={styles.successActions}>
            <Link to="/catalog" className={styles.btnPrimaryLink}>
              Browse Catalog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Link to="/cart" className={styles.backLink}>
        ← Back to Cart
      </Link>
      <h1 className={styles.pageTitle}>Checkout</h1>

      <form onSubmit={handlePlaceOrder} className={styles.layout}>
        <div className={styles.formColumn}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>1. Contact Information</h2>
            <div className={styles.fieldsGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+380 XX XXX XX XX"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>2. Shipping Details</h2>
            <div className={styles.optionsList}>
              {[
                {
                  id: 'nova_poshta',
                  label: 'Nova Poshta Branch / Locker',
                  cost: 'Free',
                },
                {
                  id: 'courier',
                  label: 'Express Door-to-Door Courier',
                  cost: 'Free',
                },
                { id: 'pickup', label: 'Partner Store Pickup', cost: 'Free' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`${styles.optionItem} ${
                    formData.deliveryMethod === method.id
                      ? styles.optionItemActive
                      : ''
                  }`}
                >
                  <span className={styles.optionLeft}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={method.id}
                      checked={formData.deliveryMethod === method.id}
                      onChange={handleChange}
                    />
                    {method.label}
                  </span>
                  <span className={styles.optionPrice}>{method.cost}</span>
                </label>
              ))}
            </div>

            <div className={styles.fieldsGrid} style={{ marginTop: '16px' }}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Uzhhorod"
                  value={formData.city}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Branch / Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Branch #1 or Street, Apt"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>3. Payment Method</h2>
            <div className={styles.optionsList}>
              {[
                {
                  id: 'card',
                  label: 'Online Card Payment (Apple Pay / Google Pay)',
                },
                { id: 'cod', label: 'Cash or Card on Delivery' },
              ].map((pay) => (
                <label
                  key={pay.id}
                  className={`${styles.optionItem} ${
                    formData.paymentMethod === pay.id
                      ? styles.optionItemActive
                      : ''
                  }`}
                >
                  <span className={styles.optionLeft}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pay.id}
                      checked={formData.paymentMethod === pay.id}
                      onChange={handleChange}
                    />
                    {pay.label}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.card}>
          <h2 className={styles.cardTitle}>Order Summary</h2>

          <div className={styles.orderItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <img
                  src={item.img}
                  alt={item.title}
                  className={styles.orderItemImg}
                />
                <div className={styles.orderItemInfo}>
                  <p className={styles.orderItemTitle}>{item.title}</p>
                  <p className={styles.orderItemMeta}>
                    {item.quantity} × {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summaryRow}>
            <span>Items ({cartSummary.totalItems}):</span>
            <span>{cartSummary.formattedTotal}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Delivery:</span>
            <span className={styles.optionPrice}>Free</span>
          </div>

          <div className={styles.summaryTotal}>
            <span>Total to Pay:</span>
            <span>{cartSummary.formattedTotal}</span>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirm Order
          </button>
        </aside>
      </form>
    </main>
  );
}
