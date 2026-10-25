import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { useState } from 'react';
import Header from './modules/components/Header';
import Footer from './modules/components/Footer';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ComparePage from './pages/ComparePage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const FOOTER_CONFIG = {
  catalog: {
    title: 'Catalog of products',
    description: 'Comparing prices worldwide',
  },
  detail: {
    title: 'Product details',
    description: 'Full description of product and price currency',
  },
  compare: {
    title: 'Comparison builder',
    description: 'Compare products and choose the best proposition',
  },
  auth: {
    title: 'Authorisation',
    description: 'Enter in account to save your products in cart',
  },
};

export default function App() {
  const [activePage, setActivePage] = useState('catalog');
  const currentFooter = FOOTER_CONFIG[activePage] || FOOTER_CONFIG.catalog;

  return (
    <div className={styles.appContainer}>
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<h2>Сторінку не знайдено (404)</h2>} />
        </Routes>
      </main>

      <Footer
        title={currentFooter.title}
        description={currentFooter.description}
      />
    </div>
  );
}
