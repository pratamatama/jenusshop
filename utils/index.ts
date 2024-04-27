export const toCurrency = (value: string | number | null | undefined) => {
  if (!value) return 'Rp 0.00'

  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencySign: 'accounting',
    minimumFractionDigits: 0,
  })
}
