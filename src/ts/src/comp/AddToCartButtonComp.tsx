import * as m from 'mithril'

import { addToCart, getCartCount, removeFromCart } from '../data/CartMethods'

import { ClassComponent } from './ClassComponent'
import { Volume } from '../data/Volume'
import { formatPrice } from '../util/NumberUtil'
import { get } from '../util/MithrilUtil'

export interface IAddToCartButtonCompAttrs {
	_volume: Volume
}

type Vnode = m.CVnode<IAddToCartButtonCompAttrs>
type VnodeDOM = m.CVnodeDOM<IAddToCartButtonCompAttrs>

export class AddToCartButtonComp extends ClassComponent<IAddToCartButtonCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		if (!v.attrs._volume) return ''
		
		let count = getCartCount(v.attrs._volume.id)
		let retailPrice = get(() => v.attrs._volume.saleInfo.retailPrice)
		return [
			<button
				type="button"
				class="btn btn-success"
				onclick={() => addToCart(v.attrs._volume)}
			>
				{retailPrice &&
					formatPrice(retailPrice.amount, retailPrice.currencyCode) + ` each – `
				}
				{' '}
				<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
				{' '}
				{count == 0 ? 'Add to cart' : `${count} in cart`}
			</button>,
			' ',
			count > 0 &&
			<button
				type="button"
				class="btn"
				onclick={() => removeFromCart(v.attrs._volume.id)}
			>
				<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
				{' '}
				{'Remove from cart'}
			</button>,
		]
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}