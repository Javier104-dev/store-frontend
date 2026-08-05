import Decimal from 'decimal.js';

export const sanitizeNumber = (value: number): number => {
  return Number.isFinite(value) ? value : 0;
};

export const toFixedDecimal = (value: number): string => {
  return new Decimal(value).toFixed(2);
};
