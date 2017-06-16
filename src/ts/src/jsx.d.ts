import * as m from 'mithril'

import { IHeaderCompAttrs } from './comp/HeaderComp'

declare global {
	module JSX {
		interface Element extends m.Vnode<any, any> {

		}
		interface IntrinsicElements {
			[s: string]: any
		}
		interface ElementAttributesProperty {
			__jsx_attrs: any
		}
	}
}