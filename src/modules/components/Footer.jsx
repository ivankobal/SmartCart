import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

function getFooterConfig(pathname) {
  if (pathname.startsWith('/compare')) {
    return {
      title: 'Comparison Matrix Engine',
      description:
        'Side-by-side specification analysis, automatic best-price detection, and price difference tracking across selected products.',
      middleTitle: 'Quick Actions',
      middleLinks: [
        { label: 'Browse All Products', to: '/catalog' },
        { label: 'Compare Electronics', to: '/catalog?section=electronics' },
        { label: 'Compare Appliances', to: '/catalog?section=appliances' },
      ],
    };
  }

  if (pathname.startsWith('/cart')) {
    return {
      title: 'SmartCart Shopping List',
      description:
        'Organize your selected items, adjust quantities, and calculate total bundle costs before checkout.',
      middleTitle: 'Continue Exploring',
      middleLinks: [
        { label: 'Back to Catalog', to: '/catalog' },
        { label: 'Comparison Matrix', to: '/compare' },
        { label: 'Groceries & Daily Goods', to: '/catalog?section=groceries' },
      ],
    };
  }

  if (pathname.startsWith('/profile')) {
    return {
      title: 'SmartCart Account & Preferences',
      description:
        'Manage your personal profile, saved product lists, and active price monitoring preferences.',
      middleTitle: 'Navigation',
      middleLinks: [
        { label: 'Product Catalog', to: '/catalog' },
        { label: 'Comparison Builder', to: '/compare' },
        { label: 'Shopping List', to: '/cart' },
      ],
    };
  }

  if (pathname.startsWith('/auth') || pathname.startsWith('/signup')) {
    return {
      title: 'SmartCart Security',
      description:
        'Protected user authentication for syncing your comparison lists and shopping preferences.',
      middleTitle: 'Platform',
      middleLinks: [
        { label: 'Home Page', to: '/home' },
        { label: 'Browse Catalog without Sign In', to: '/catalog' },
      ],
    };
  }

  if (pathname.startsWith('/product/')) {
    return {
      title: 'Product Specifications & Offers',
      description:
        'Detailed overview and multi-seller price comparison for your selected item.',
      middleTitle: 'Popular Sections',
      middleLinks: [
        { label: 'Electronics', to: '/catalog?section=electronics' },
        { label: 'Home Appliances', to: '/catalog?section=appliances' },
        { label: 'Groceries', to: '/catalog?section=groceries' },
      ],
    };
  }

  return {
    title: 'Catalog',
    description:
      'Comprehensive price monitoring and cross-shop product aggregator database across all everyday categories.',
    middleTitle: 'Sections',
    middleLinks: [
      { label: 'Electronics', to: '/catalog?section=electronics' },
      { label: 'Home Appliances', to: '/catalog?section=appliances' },
      { label: 'Groceries & Food', to: '/catalog?section=groceries' },
    ],
  };
}

export default function Footer() {
  const { pathname } = useLocation();
  const config = getFooterConfig(pathname);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerCol}>
          <h5>{config.title}</h5>
          <p>{config.description}</p>
        </div>

        <div className={styles.footerCol}>
          <h5>{config.middleTitle}</h5>
          <ul>
            {config.middleLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h5>Support &amp; Legal</h5>
          <ul>
            <li>
              <Link to="/home">About SmartCart</Link>
            </li>
            <li>
              <Link to="/catalog">Price Aggregator</Link>
            </li>
            <li>
              <Link to="/profile">User Account</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
