import * as m from 'mithril'

export interface IAppCompAttrs { }
export interface IAppCompState { }

type Vnode = m.Vnode<IAppCompAttrs, IAppCompState>
type VnodeDOM = m.VnodeDOM<IAppCompAttrs, IAppCompState>

export const AppComp: m.Comp<IAppCompAttrs, IAppCompState> = {
	
	// oninit(v) {},
	// onbeforeupdate(v, o) {},
	view(v) {
		return (
			m(`nav.navbar.navbar-default`,
				m(`.container-fluid`,
					m(`.navbar-header`,
						m(`button.navbar-toggle.collapsed[type=button][aria-expanded=false]`,
							m(`span.sr-only`,
								`Toggle navigation`
							),
							[0, 1, 2].map(_ => m(`span.icon-bar`))
						),
						m(`a.navbar-brand[href=#]`,
							`Book Search`
						)
					)
				)
			)
		)
	},
	// oncreate(v) {},
	// onupdate(v) {},
	// onbeforeremove(v) {},
	// onremove(v) {}
}