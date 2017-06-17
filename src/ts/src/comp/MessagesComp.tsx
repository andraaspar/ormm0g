import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'
import { get } from '../util/MithrilUtil'

export interface IMessagesCompAttrs {
	_messages: string[]
}

type Vnode = m.CVnode<IMessagesCompAttrs>
type VnodeDOM = m.CVnodeDOM<IMessagesCompAttrs>

export class MessagesComp extends ClassComponent<IMessagesCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			get(() => !!v.attrs._messages.length) &&
			v.attrs._messages.map(message => (
				<div class="alert alert-danger" role="alert">
					{message}
				</div>
			))
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}