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

// Ugly hack to work around https://github.com/MithrilJS/mithril.js/issues/1734

// BEGIN HACK
function getHashPath() {
	return location.hash.replace(/^#!/, '')
}

let popstatePath: string
window.addEventListener('popstate', () => {
	// This event should trigger before hashchange, but IE11 fails to trigger it
	// on back button click. We save the hash path to confirm that it happened.
	popstatePath = getHashPath()
}, false)

let hashchangeTimeoutRef: number
window.addEventListener('hashchange', () => {
	// This event triggers after popstate, and is more reliable in IE11.
	
	// We cancel timeout in the rare case that another hash change happened in
	// the time frame when doing a double check.
	clearTimeout(hashchangeTimeoutRef)
	
	let hashPath = getHashPath()
	if (popstatePath != hashPath) {
		// The popstate event never happened. This should be IE11. We need to
		// force it.
		console.info('Fixing Mithril path.', m.route.get(), popstatePath, hashPath)
		
		m.route.set(hashPath, undefined, {
			replace: true, // To let the browser navigate back
		})
	} else {
		// The popstate event triggered, and we should be good, except...
		
		console.info('Mithril path is correct.', m.route.get(), popstatePath, hashPath)
	}
	
	// Despite all our efforts, Mithril does not recognize the popstate event
	// occasionally. Need to double check it all went fine. And what's more, if
	// it goes fine, it will happen in the future – hence the timeout.
	
	// To reproduce in IE11, click cart then book then back then a different
	// book then cart.
	hashchangeTimeoutRef = setTimeout(() => {
		hashPath = getHashPath()
		if (m.route.get() != hashPath) {
			// Mithril failed to recognize the new path, so we need to force
			// it.
			console.info('Double fixing Mithril path.')
			
			m.route.set(hashPath, undefined, {
				replace: true, // To let the browser navigate back
			})
		}
	}, 100)
}, false)
// END HACK

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
	return '#!' + ROUTE_VOLUME_DETAILS.replace(/:volumeId\b/, encodeURIComponent(volumeId))
}

export function getCartPageLink() {
	return '#!' + ROUTE_CART
}