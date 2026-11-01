import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Header from './modules/components/Header';
import Footer from './modules/components/Footer';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ComparePage from './pages/ComparePage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

export default function App() {
  return (
    <div className={styles.appContainer}>
      <Header />

      <main>
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

      <Footer />
    </div>
  );
}
