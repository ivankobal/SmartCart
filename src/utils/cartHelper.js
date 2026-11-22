export function calculateCartSummary(cartItems) {
  if (!cartItems || cartItems.length === 0) {
    return {
      totalItems: 0,
      totalPrice: 0,
      formattedTotal: '0 ₴',
    };
  }

  let totalItems = 0;
  let totalPrice = 0;

  for (const item of cartItems) {
    const qty = Number(item.quantity) || 1;
    const unitPrice =
      Number(item.numericPrice) ||
      Number(String(item.price).replace(/[^\d.]/g, '')) ||
      0;

    totalItems += qty;
    totalPrice += unitPrice * qty;
  }

  return {
    totalItems,
    totalPrice,
    formattedTotal: `${totalPrice.toLocaleString('uk-UA')} ₴`,
  };
}
