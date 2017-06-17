import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'

export interface IProgressCompAttrs { }

type Vnode = m.CVnode<IProgressCompAttrs>
type VnodeDOM = m.CVnodeDOM<IProgressCompAttrs>

export class ProgressComp extends ClassComponent<IProgressCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<p class="text-center">
				<span className="glyphicon glyphicon-hourglass" aria-hidden="true"></span>
				{' '}
				Loading...
			</p>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}