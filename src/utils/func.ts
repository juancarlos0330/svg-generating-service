export const ascii = (a: any) => a.charCodeAt(0);
export const gtEq = (a: any, b: any) => a >= b;
export const ltEq = (a: any, b: any) => a <= b;

export const formatPrice = (value: number) => {
  return value.toLocaleString("en", { minimumFractionDigits: 6, maximumFractionDigits: 8 });
};
