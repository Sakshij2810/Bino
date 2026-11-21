// src/lib/format.ts
export const formatPair = (symbol: string) => {
  return symbol.replace(/USDT$/, "/USDT");
};

export const formatPrice = (value: string | number) => {
  const price = Number(value);

  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 5 : 2,
  });
};
