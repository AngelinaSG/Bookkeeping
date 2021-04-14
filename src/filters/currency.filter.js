export default function currencyFilter(value, currency = 'UAH') {
    return new Intl.NumberFormat('ua-UA', {
        style: 'currency',
        currency: currency
    }).format(value)
}