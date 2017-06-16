import * as m from 'mithril'

import { AppComp } from '../comp/AppComp'
import { ClassComponent } from '../comp/ClassComponent'
import { ResultsComp } from '../comp/ResultsComp'

export interface IIndexPageAttrs { }

type Vnode = m.CVnode<IIndexPageAttrs>
type VnodeDOM = m.CVnodeDOM<IIndexPageAttrs>

export class IndexPage extends ClassComponent<IIndexPageAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<AppComp>
				<ResultsComp/>
			</AppComp>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}