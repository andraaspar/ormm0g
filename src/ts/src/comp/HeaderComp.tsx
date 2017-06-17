import * as m from 'mithril'

import { abortSearch, search } from '../data/SearchMethods'

import { ClassComponent } from './ClassComponent'
import { TMithrilEvent } from '../util/TMithrilEvent'
import { data } from '../data/data'
import debounce from 'lodash/debounce'
import { goToIndexPage } from '../main'

export interface IHeaderCompAttrs { }

type Vnode = m.CVnode<IHeaderCompAttrs>
type VnodeDOM = m.CVnodeDOM<IHeaderCompAttrs>

export class HeaderComp extends ClassComponent<IHeaderCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<div class="navbar-header">
						<a class="navbar-brand">Book Search</a>
					</div>
					<div class="navbar-form navbar-right" role="search">
						<div class="form-group">
							<input
								type="text"
								class="form-control"
								placeholder="Find books"
								value={data.search.query}
								onkeydown={onQueryKeyDown}
								oninput={onQueryInput}
							/>
						</div>
						{' '}
						<button
							type="button"
							class="btn btn-default"
							title="Search"
							onclick={onSearchRequested}
						>
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
						</button>
					</div>
				</div>
			</nav>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}

function onSearchRequested(e: TMithrilEvent<Event>) {
	// Prevent redraw, as page change will trigger a redraw anyway
	e.redraw = false
	// Let search update data first
	search()
	goToIndexPage({})
}

function onQueryInput(e: TMithrilEvent<Event>) {
	// Redraw must happen to update after data change, but we don't need to
	// check the hash as it will be certainly different and we don't want to
	// search just yet
	data.noHashCheck = true
	data.search.query = (e.target as HTMLInputElement).value || ''
	abortSearch()
	onQueryInputDebounced()
}

const onQueryInputDebounced = debounce(onQueryInputInternal, 600)
function onQueryInputInternal() {
	// Search first as page change will trigger redraw
	search()
	goToIndexPage({ page: 1 })
}

function onQueryKeyDown(e: TMithrilEvent<KeyboardEvent>) {
	// We don't change the data here – no need to redraw
	e.redraw = false
	switch (e.key) {
		case 'Enter':
			onSearchRequested(e)
			break
	}
}