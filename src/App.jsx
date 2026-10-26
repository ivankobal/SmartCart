import { useState } from 'react';
import Header from './modules/components/Header';
import Footer from './modules/components/Footer';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ComparePage from './pages/ComparePage';
import AuthPage from './pages/AuthPage'; 

export default function App() {
  const [activePage, setActivePage] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setActivePage('detail');
  };

  return (
    <div
      style={{
        backgroundColor: '#16181c',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Header activePage={activePage} setActivePage={setActivePage} />

      {activePage === 'catalog' && (
        <CatalogPage onSelectProduct={handleProductSelect} />
      )}

      {activePage === 'detail' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          goBack={() => setActivePage('catalog')}
        />
      )}

      {activePage === 'compare' && <ComparePage />}

      {activePage === 'auth' && <AuthPage />}

      <Footer />
    </div>
  );
}
