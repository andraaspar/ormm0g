import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'

export interface INoResultsCompAttrs {
	_message: m.Children
}

type Vnode = m.CVnode<INoResultsCompAttrs>
type VnodeDOM = m.CVnodeDOM<INoResultsCompAttrs>

export class NoResultsComp extends ClassComponent<INoResultsCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<p class="text-center"><em>{v.attrs._message}</em></p>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}