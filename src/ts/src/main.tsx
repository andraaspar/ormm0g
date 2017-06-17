import '../../less/src/style.less'

import * as m from 'mithril'

import { GLOBAL } from 'illa/GLOBAL'
import { IndexPage } from './page/IndexPage'
import { data } from './data/data'

GLOBAL.m = m

const ROUTE_ROOT = '/'
const ROUTE_QUERY = '/search/:query'
const ROUTE_QUERY_PAGE = '/search/:query/page/:page'

m.route(document.getElementById('app'), ROUTE_ROOT, {
	[ROUTE_ROOT]: IndexPage,
	[ROUTE_QUERY]: IndexPage,
	[ROUTE_QUERY_PAGE]: IndexPage,
})

export function goToIndexPage({ query = data.search.query, page = data.search.page }) {
	if (query) {
		if (page == 1) {
			m.route.set(ROUTE_QUERY, { query: encodeURIComponent(query) })
		} else {
			m.route.set(ROUTE_QUERY_PAGE, { query: encodeURIComponent(query), page })
		}
	} else {
		m.route.set(ROUTE_ROOT)
	}
}