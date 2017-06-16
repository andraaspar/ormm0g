import * as m from 'mithril'

export abstract class ClassComponent<A> implements m.ClassComponent<A> {
	
	// Required for type checking JSX attributes
	private __jsx_attrs: A
	
	// Copy of m.ClassComponent<A>.view required by TS
	abstract view(vnode: m.Vnode<A, this>): m.Children | null | void
}