import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'

export interface IOptionalLinkCompAttrs {
	_href?: string
}

type Vnode = m.CVnode<IOptionalLinkCompAttrs>
type VnodeDOM = m.CVnodeDOM<IOptionalLinkCompAttrs>

export class OptionalLinkComp extends ClassComponent<IOptionalLinkCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (v.attrs._href ?
			<a href={v.attrs._href}>
				{v.children}
			</a>
			:
			[
				v.children
			]
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}