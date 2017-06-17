import * as m from 'mithril'

import { ClassComponent } from './ClassComponent'
import { PagingComp } from './PagingComp'
import { Volume } from '../data/Volume'
import { data } from '../data/data'
import { get } from '../util/MithrilUtil'
import { goToIndexPage } from '../main'

export interface IResultsCompAttrs { }

type Vnode = m.CVnode<IResultsCompAttrs>
type VnodeDOM = m.CVnodeDOM<IResultsCompAttrs>

export class ResultsComp extends ClassComponent<IResultsCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<div>
				{(data.search.xhr ?
					<p class="text-center">
						<span className="glyphicon glyphicon-hourglass" aria-hidden="true"></span>
						{' '}
						Loading...
					</p>
					:
					(data.search.response ?
						(data.search.response.totalItems ?
							[
								(<p>Results: {data.search.response.totalItems}</p>),
								get(() => !!data.search.response.items.length) &&
								data.search.response.items.map(volume => (
									<div class="media">
										{
											get(() => volume.volumeInfo.imageLinks.smallThumbnail) &&
											<div class="media-left">
												<a href="#">
													<img class="media-object" src={volume.volumeInfo.imageLinks.smallThumbnail} alt={`Cover image of ${volume.volumeInfo.title}`} />
												</a>
											</div>
										}
										<div class="media-body">
											<h4 class="media-heading">
												{volume.volumeInfo.title}
												{volume.volumeInfo.subtitle &&
													<span>
														<br />
														<small>{volume.volumeInfo.subtitle}</small>
													</span>
												}
											</h4>
											{
												get(() => !!volume.volumeInfo.authors.length) &&
												<p>Authors: {volume.volumeInfo.authors.join(', ')}</p>
											}
											<div>
												{get<m.Children>(() => m.trust(volume.searchInfo.textSnippet), () => volume.volumeInfo.description)}
											</div>
											<br />
											<p>
												<button
													type="button"
													class="btn btn-success"
												>
													{get(() => volume.saleInfo.retailPrice) &&
														formatPrice(volume.saleInfo.retailPrice.amount, volume.saleInfo.retailPrice.currencyCode) + ` – `
													}
													Add to cart
												</button>
											</p>
										</div>
									</div>
								)),
								(<PagingComp
									_value={data.search.page}
									_lastValue={Math.ceil(data.search.response.totalItems / 10)}
									_setter={setPage}
									_noLast={true /* Result count changes between pages, last page is informative only. */}
								/>)
							]
							:
							<p class="text-center"><em>No results.</em></p>
						)
						:
						<p class="text-center"><em>Specify a query to start searching.</em></p>
					)
				)}
			</div>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}

function setPage(page: number) {
	goToIndexPage({ page })
}

function formatPrice(amount: number, currency: string) {
	return get(() => amount.toLocaleString(getLocale(), { style: 'currency', currency, currencyDisplay: 'symbol' }), () => amount + '')
}

function getLocale() {
	return (navigator.language || (navigator as any).userLanguage || (navigator as any).browserLanguage || (navigator as any).systemLanguage) + ''
}