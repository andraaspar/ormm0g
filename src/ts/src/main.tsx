import '../../less/src/style.less'

import * as m from 'mithril'

import { AppComp } from './comp/AppComp'
import { GLOBAL } from 'illa/GLOBAL'
import { IndexPage } from './page/IndexPage'

GLOBAL.m = m

m.route(document.getElementById('app'), '/', {
	'/': IndexPage
})