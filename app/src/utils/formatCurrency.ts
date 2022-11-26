export function formatCurrency(currency: string) {
  const value = parseFloat(currency);
  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
