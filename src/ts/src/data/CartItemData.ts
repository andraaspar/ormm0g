import { Volume } from './Volume'

export class CartItemData {
	constructor(
		public volumeId: string,
		public quantity: number,
		public volume: Volume,
		public xhr: XMLHttpRequest,
		public messages: string[],
	) {}
}