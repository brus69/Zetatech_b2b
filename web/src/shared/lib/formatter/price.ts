export const priceFormat = (price?: string | number | null) => {
  if (!price) return "";

  return Number(price)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$& ")
    .slice(0, -3);
};
