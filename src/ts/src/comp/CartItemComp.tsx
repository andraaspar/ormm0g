import * as m from 'mithril'

import { booksServerGetVolume, handleXhrError } from '../server/BooksServer'

import { CartItemData } from '../data/CartItemData'
import { ClassComponent } from './ClassComponent'
import { VolumeComp } from './VolumeComp'

export interface ICartItemCompAttrs {
	_item: CartItemData
}

type Vnode = m.CVnode<ICartItemCompAttrs>
type VnodeDOM = m.CVnodeDOM<ICartItemCompAttrs>

export class CartItemComp extends ClassComponent<ICartItemCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<div class="well">
				<VolumeComp _volume={v.attrs._item.volume}/>
			</div>
		)
	}
	oncreate(v: VnodeDOM) {
		if (!v.attrs._item.volume && !v.attrs._item.xhr) {
			v.attrs._item.messages = []
			booksServerGetVolume(v.attrs._item.volumeId, 'lite', xhr => v.attrs._item.xhr = xhr)
				.then(volume => {
					v.attrs._item.volume = volume
				})
				.catch(e => {
					handleXhrError(v.attrs._item.xhr, v.attrs._item.messages, e)
				})
				.then(() => {
					v.attrs._item.xhr = undefined
				})
			// Mithril 1.1.1 issue: no redraw when called from oncreate
			setTimeout(() => m.redraw(), 0)
		}
	}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}