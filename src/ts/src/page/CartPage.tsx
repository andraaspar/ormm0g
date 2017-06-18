import * as m from 'mithril'

import { getCartCurrencyCode, getCartValueSum, removeFromCart } from '../data/CartMethods'

import { AddToCartButtonComp } from '../comp/AddToCartButtonComp'
import { AppComp } from '../comp/AppComp'
import { CartItemComp } from '../comp/CartItemComp'
import { ClassComponent } from '../comp/ClassComponent'
import { NoResultsComp } from '../comp/NoResultsComp'
import { ProgressComp } from '../comp/ProgressComp'
import { SITE_TITLE_SUFFIX } from '../main'
import { VolumeThumbnailComp } from '../comp/VolumeThumbnailComp'
import { data } from '../data/data'
import { formatPrice } from '../util/NumberUtil'
import { get } from '../util/MithrilUtil'

export interface ICartPageAttrs { }

type Vnode = m.CVnode<ICartPageAttrs>
type VnodeDOM = m.CVnodeDOM<ICartPageAttrs>

export class CartPage extends ClassComponent<ICartPageAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		let currencyCode = getCartCurrencyCode()
		let totalValue = currencyCode ? getCartValueSum() : undefined
		return (
			<AppComp>
				<h2>Shopping cart</h2>
				{(get(() => data.cart.items.length > 0) ?
					[
						data.cart.items.map((item, index) => (
							<CartItemComp key={item.volumeId} _item={item} />
						)),
						<div class="panel panel-default">
							<div class="panel-body">
								<strong>Total value:</strong>
								{' '}
								{totalValue ?
									formatPrice(totalValue, currencyCode)
									:
									'–'
								}
							</div>
						</div>
					]
					:
					<NoResultsComp _message="There are no items in the shopping cart." />
				)}
			</AppComp>
		)
	}
	oncreate(v: VnodeDOM) {
		document.title = 'Shopping cart' + SITE_TITLE_SUFFIX
	}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}