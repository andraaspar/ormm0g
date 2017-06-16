import '../../less/src/style.less'

import * as m from 'mithril'

import { AppComp } from './comp/AppComp'
import { GLOBAL } from 'illa/GLOBAL'

GLOBAL.m = m
m.mount(document.getElementById('app')!, AppComp)