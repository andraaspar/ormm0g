import * as m from 'mithril'

import { AppComp } from '../comp/AppComp'
import { ClassComponent } from '../comp/ClassComponent'
import { ResultsComp } from '../comp/ResultsComp'
import { data } from '../data/data'
import { search } from '../data/SearchMethods'

export interface IIndexPageAttrs {
	query?: string
	page?: string
}

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
	oncreate(v: VnodeDOM) {
		checkHash(v)
	}
	onupdate(v: VnodeDOM) {
		checkHash(v)
	}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}

function checkHash(v: Vnode) {
	if (data.noHashCheck) {
		data.noHashCheck = false
		return
	}
	let queryMatches = v.attrs.query == data.search.query
	let pageMatches = (!v.attrs.page && data.search.page == 1) || (parseInt(v.attrs.page) == data.search.page)
	let isChanged = !queryMatches || !pageMatches
	data.search.query = v.attrs.query || ''
	data.search.page = parseInt(v.attrs.page) || 1
	if (isChanged) {
		search()
		// Mithril 1.1.1 issue: no redraw when called from oncreate
		setTimeout(() => m.redraw(), 0)
	}
}