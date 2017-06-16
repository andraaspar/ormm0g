import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'
import { TMithrilEvent } from '../util/TMithrilEvent'
import { booksServerSearch } from '../server/BooksServer'
import { data } from '../data/data'
import { throttle } from "illa/FunctionUtil";

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
								oninput={oninput}
							/>
						</div>
						{' '}
						<button
							type="button"
							class="btn btn-default"
							title="Search"
							onclick={search}
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

function oninput(e: TMithrilEvent<Event>) {
	data.search.query = (e.target as HTMLInputElement).value
	search()
}

function search() {
	if (data.search.xhr) {
		data.search.xhr.abort()
	}
	data.search.response = undefined
	loadSearchResultsThrottled()
}

const loadSearchResultsThrottled = throttle(loadSearchResults, null, 600)
function loadSearchResults() {
	if (data.search.query.length < 3) return
	booksServerSearch(data.search.query, xhr => data.search.xhr = xhr)
		.then(results => data.search.response = results)
		.catch(e => {
			data.search.response = undefined
			data.search.messages.push(e + '')
		})
		.then(() => data.search.xhr = undefined)
}