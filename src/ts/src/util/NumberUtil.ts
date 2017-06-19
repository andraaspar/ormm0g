import { escapeRegExp } from 'illa/StringUtil'
import { get } from './MithrilUtil'

let numberSuffixRe = new RegExp(escapeRegExp(formatNumber(1).slice(1)) + '$')

export function formatNumber(amount: number) {
	let result = get(() => amount.toLocaleString(getLocale()), () => amount + '')
	if (numberSuffixRe) {
		result = result.replace(numberSuffixRe, '')
	}
	return result
}

export function formatPrice(amount: number, currency: string) {
	return get(() => amount.toLocaleString(getLocale(), { style: 'currency', currency, currencyDisplay: 'symbol' }), () => amount + '')
}

function getLocale() {
	return (navigator.language || (navigator as any).userLanguage || (navigator as any).browserLanguage || (navigator as any).systemLanguage) + ''
}