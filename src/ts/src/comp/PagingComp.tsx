import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'
import { classes } from '../util/MithrilUtil'

export interface IPagingCompAttrs {
	_value: number
	_lastValue: number
	_setter: (v: number) => any
	_noLast?: boolean
}

type Vnode = m.CVnode<IPagingCompAttrs>
type VnodeDOM = m.CVnodeDOM<IPagingCompAttrs>

export class PagingComp extends ClassComponent<IPagingCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		let isFirstPage = v.attrs._value == 1
		let isLastPage = v.attrs._value == v.attrs._lastValue
		return (
			<nav aria-label="Page navigation">
				<ul class="pagination">
					<li class={classes(
						isFirstPage && `disabled`
					)}>
						<a
							type="button"
							title="First"
							onclick={() => goToFirstPage(v)}
						>
							<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
							<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						</a>
					</li>
					<li class={classes(
						isFirstPage && `disabled`
					)}>
						<a
							type="button"
							title="Previous"
							onclick={() => goToPreviousPage(v)}
						>
							<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						</a>
					</li>
					<li class="active"><a>Page {v.attrs._value} of {v.attrs._lastValue}</a></li>
					<li class={classes(
						isLastPage && `disabled`
					)}>
						<a
							type="button"
							title="Next"
							onclick={() => goToNextPage(v)}
						>
							<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
						</a>
					</li>
					{
						!v.attrs._noLast &&
						<li class={classes(
							isLastPage && `disabled`
						)}>
							<a
								type="button"
								title="Last"
								onclick={() => goToLastPage(v)}
							>
								<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
								<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							</a>
						</li>
					}
				</ul>
			</nav>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}

function goToFirstPage(v: Vnode) {
	if (v.attrs._value > 1) {
		v.attrs._setter(1)
	}
}

function goToPreviousPage(v: Vnode) {
	if (v.attrs._value > 1) {
		v.attrs._setter(v.attrs._value - 1)
	}
}

function goToNextPage(v: Vnode) {
	if (v.attrs._value < v.attrs._lastValue) {
		v.attrs._setter(v.attrs._value + 1)
	}
}

function goToLastPage(v: Vnode) {
	if (v.attrs._value < v.attrs._lastValue) {
		v.attrs._setter(v.attrs._lastValue)
	}
}