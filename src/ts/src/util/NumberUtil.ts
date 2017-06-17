import { get } from './MithrilUtil'

export function formatPrice(amount: number, currency: string) {
	return get(() => amount.toLocaleString(getLocale(), { style: 'currency', currency, currencyDisplay: 'symbol' }), () => amount + '')
}

function getLocale() {
	return (navigator.language || (navigator as any).userLanguage || (navigator as any).browserLanguage || (navigator as any).systemLanguage) + ''
}