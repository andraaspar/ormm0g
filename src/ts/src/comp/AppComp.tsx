import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'
import { HeaderComp } from './HeaderComp'

export interface IAppCompAttrs { }

type Vnode = m.CVnode<IAppCompAttrs>
type VnodeDOM = m.CVnodeDOM<IAppCompAttrs>

export class AppComp extends ClassComponent<IAppCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<div class="container-fluid">
				<HeaderComp/>
				{v.children}
			</div>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}