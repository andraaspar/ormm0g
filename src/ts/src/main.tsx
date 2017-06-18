import '../../less/src/style.less'

import * as m from 'mithril'

import { CartPage } from './page/CartPage'
import { GLOBAL } from 'illa/GLOBAL'
import { IndexPage } from './page/IndexPage'
import { VolumeDetailsPage } from './page/VolumeDetailsPage'
import { data } from './data/data'
import { restoreCart } from './data/CartMethods'

GLOBAL.m = m

const ROUTE_ROOT = '/'
const ROUTE_QUERY = '/search/:query'
const ROUTE_QUERY_PAGE = '/search/:query/page/:page'

const ROUTE_VOLUME_DETAILS = '/volume-details/:volumeId'

const ROUTE_CART = '/cart'

export const SITE_TITLE = 'The Book Shop'
export const SITE_TITLE_SUFFIX = ` | ${SITE_TITLE}`

restoreCart()

m.route(document.getElementById('app'), ROUTE_ROOT, {
	[ROUTE_ROOT]: IndexPage,
	[ROUTE_QUERY]: IndexPage,
	[ROUTE_QUERY_PAGE]: IndexPage,
	
	[ROUTE_VOLUME_DETAILS]: VolumeDetailsPage,
	
	[ROUTE_CART]: CartPage,
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

export function goToVolumeDetailsPage(volumeId: string) {
	m.route.set(ROUTE_VOLUME_DETAILS, { volumeId: encodeURIComponent(volumeId) })
}

export function getVolumeDetailsPageLink(volumeId: string) {
	return '#!' + ROUTE_VOLUME_DETAILS.replace(/:volumeId/, encodeURIComponent(volumeId))
}

export function getCartPageLink() {
	return '#!' + ROUTE_CART
}