export function analyzeComparison(products) {
  if (!products || products.length === 0) {
    return {
      items: [],
      minPrice: 0,
      hasSameBrand: false,
      hasSameCategory: false,
    };
  }

  const validPrices = products
    .map((p) => Number(p.numericPrice))
    .filter((price) => !isNaN(price) && price > 0);

  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

  const uniqueBrands = new Set(products.map((p) => p.brand).filter(Boolean));
  const uniqueCategories = new Set(
    products.map((p) => p.category).filter(Boolean),
  );

  const enrichedItems = products.map((product) => {
    const currentPrice = Number(product.numericPrice) || 0;
    const isBestPrice =
      products.length > 1 && currentPrice > 0 && currentPrice === minPrice;
    const priceDiff = currentPrice > minPrice ? currentPrice - minPrice : 0;

    const parsedSpecs = product.specs
      ? product.specs
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    return {
      ...product,
      isBestPrice,
      priceDiff,
      parsedSpecs,
    };
  });

  return {
    items: enrichedItems,
    minPrice,
    hasSameBrand: uniqueBrands.size === 1 && products.length > 1,
    hasSameCategory: uniqueCategories.size === 1 && products.length > 1,
  };
}

export function sortComparisonItems(items, sortConfig) {
  if (!sortConfig?.key || items.length <= 1) {
    return items;
  }

  const { key, direction } = sortConfig;
  const multiplier = direction === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    switch (key) {
      case 'price': {
        const priceA = Number(a.numericPrice) || 0;
        const priceB = Number(b.numericPrice) || 0;
        return (priceA - priceB) * multiplier;
      }
      case 'category': {
        const catA = (a.category || '').toLowerCase();
        const catB = (b.category || '').toLowerCase();
        return catA.localeCompare(catB) * multiplier;
      }
      case 'brand': {
        const brandA = (a.brand || '').toLowerCase();
        const brandB = (b.brand || '').toLowerCase();
        return brandA.localeCompare(brandB) * multiplier;
      }
      case 'specs': {
        return (a.parsedSpecs.length - b.parsedSpecs.length) * multiplier;
      }
      default:
        return 0;
    }
  });
}
