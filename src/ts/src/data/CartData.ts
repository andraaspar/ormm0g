import { CartItemData } from './CartItemData'

export class CartData {
	constructor(
		public items: CartItemData[] = [],
	) { }
}