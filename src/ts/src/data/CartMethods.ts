import { CartItemData } from './CartItemData'
import { Volume } from './Volume'
import { data } from './data'
import { get } from '../util/MithrilUtil'

const CART_KEY = 'cart-items'

export function addToCart(volume: Volume) {
	if (getCartCount(volume.id)) {
		data.cart.items.filter(item => item.volumeId == volume.id)[0].quantity++
	} else {
		data.cart.items.push(new CartItemData(
			volume.id,
			1,
			volume,
			undefined,
			[],
		))
	}
	persistCart()
}

export function removeFromCart(volumeId: string) {
	for (let index = data.cart.items.length - 1; index >= 0; index--) {
		let item = data.cart.items[index]
		if (item.volumeId == volumeId) {
			if (item.quantity > 1) {
				item.quantity--
			} else {
				data.cart.items.splice(index, 1)
			}
			break
		}
	}
	persistCart()
}

export function getCartCount(volumeId: string) {
	return (
		data.cart.items
			.filter(item => item.volumeId == volumeId)
			.map(item => item.quantity)
			.reduce((sum, quantity) => sum + quantity, 0)
	)
}

export function getCartItemQuantitiesSum() {
	return (
		data.cart.items
			.map(item => item.quantity)
			.reduce((sum, quantity) => sum + quantity, 0)
	)
}

export function getCartCurrencyCode() {
	let currencyCode: string
	for (let item of data.cart.items) {
		let aCurrencyCode = get(() => item.volume.saleInfo.retailPrice.currencyCode)
		if (aCurrencyCode) {
			if (currencyCode && aCurrencyCode != currencyCode) {
				return undefined
			} else {
				currencyCode = aCurrencyCode
			}
		}
	}
	return currencyCode
}

export function getCartValueSum() {
	return (
		data.cart.items
			.filter(item => !!get(() => item.volume.saleInfo.retailPrice))
			.map(item => item.volume.saleInfo.retailPrice.amount * item.quantity)
			.reduce((sum, amount) => sum + amount, 0)
	)
}

export function persistCart() {
	let itemsToPersist = data.cart.items.map(item => new CartItemData(
		item.volumeId,
		item.quantity,
		undefined,
		undefined,
		undefined,
	))
	try {
		if (itemsToPersist.length) {
			localStorage.setItem(CART_KEY, JSON.stringify(itemsToPersist))
		} else {
			localStorage.removeItem(CART_KEY)
		}
	} catch (e) {
		console.error(e)
	}
}

export function restoreCart() {
	if (!data.cart.items.length) {
		try {
			let items: CartItemData[] = JSON.parse(localStorage.getItem(CART_KEY))
			if (get(() => items.length)) {
				data.cart.items = items
			}
		} catch (e) {
			console.error(e)
		}
	}
}