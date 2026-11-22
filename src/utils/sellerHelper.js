const SELLERS_BY_SECTION = {
  electronics: [
    {
      name: 'Moyo Official',
      badge: 'MO',
      variant: 'pink',
      info: 'Ships in 1-2 days • Free returns',
      priceMultiplier: 1,
    },
    {
      name: 'Foxtrot Store',
      badge: 'FX',
      variant: 'emerald',
      info: 'Ships in 1-3 days • Official warranty',
      priceMultiplier: 1.03,
    },
    {
      name: 'TechHub Direct',
      badge: 'TH',
      variant: 'blue',
      info: 'Same-day courier • Pickup available',
      priceMultiplier: 1.05,
    },
  ],
  appliances: [
    {
      name: 'HomeTech Market',
      badge: 'HT',
      variant: 'emerald',
      info: 'Free courier delivery • 24m warranty',
      priceMultiplier: 1,
    },
    {
      name: 'Kitchen & Co',
      badge: 'KC',
      variant: 'amber',
      info: 'Ships in 2-3 days • Free returns',
      priceMultiplier: 1.04,
    },
  ],
  groceries: [
    {
      name: 'MAUDAU Express',
      badge: 'MD',
      variant: 'amber',
      info: 'Next-day delivery • Fresh batch',
      priceMultiplier: 1,
    },
    {
      name: 'CityMarket Online',
      badge: 'CM',
      variant: 'emerald',
      info: 'Scheduled courier • Free over 500 ₴',
      priceMultiplier: 1.06,
    },
  ],
  household: [
    {
      name: 'CleanHouse Direct',
      badge: 'CH',
      variant: 'blue',
      info: 'Ships in 1-2 days • Bulk discount',
      priceMultiplier: 1,
    },
    {
      name: 'DailyCare Store',
      badge: 'DC',
      variant: 'emerald',
      info: 'Locker pickup • Free returns',
      priceMultiplier: 1.05,
    },
  ],
  tools: [
    {
      name: 'ProTools UA',
      badge: 'PT',
      variant: 'amber',
      info: 'Official dealer • 36m warranty',
      priceMultiplier: 1,
    },
    {
      name: 'MasterBuild Hub',
      badge: 'MB',
      variant: 'blue',
      info: 'Ships in 1-2 days • Service center',
      priceMultiplier: 1.04,
    },
  ],
};

function calculateSellerOffer(
  baseNumericPrice,
  baseFormattedPrice,
  multiplier,
) {
  const numeric =
    Number(baseNumericPrice) ||
    Number(String(baseFormattedPrice || '').replace(/[^\d.]/g, '')) ||
    0;

  if (numeric <= 0) {
    return {
      numericPrice: 0,
      price: baseFormattedPrice || 'Price on request',
    };
  }

  const adjusted = Math.round(numeric * multiplier);
  return {
    numericPrice: adjusted,
    price: `${adjusted.toLocaleString('uk-UA')} ₴`,
  };
}

export function getSellersForProduct(product) {
  if (!product) return [];

  const sectionKey = (product.section || '').toLowerCase();
  const templates =
    SELLERS_BY_SECTION[sectionKey] || SELLERS_BY_SECTION.electronics;

  const sellers = templates.map((tpl) => {
    const offer = calculateSellerOffer(
      product.numericPrice,
      product.price,
      tpl.priceMultiplier,
    );
    return {
      name: tpl.name,
      badge: tpl.badge,
      variant: tpl.variant,
      info: tpl.info,
      price: offer.price,
      numericPrice: offer.numericPrice,
    };
  });

  if (product.shopName && sellers.length > 0) {
    sellers[0] = {
      ...sellers[0],
      name: product.shopName,
      badge: product.shopName.slice(0, 2).toUpperCase(),
      info: 'Verified source • Direct offer',
    };
  }

  return sellers;
}
