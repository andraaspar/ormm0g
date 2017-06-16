import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'

export interface IHeaderCompAttrs { }

type Vnode = m.CVnode<IHeaderCompAttrs>
type VnodeDOM = m.CVnodeDOM<IHeaderCompAttrs>

export class HeaderComp extends ClassComponent<IHeaderCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand">Book Search JSX</a>
					</div>
				</div>
			</nav>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}