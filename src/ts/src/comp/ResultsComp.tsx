import * as m from 'mithril'

import { getVolumeDetailsPageLink, goToIndexPage } from '../main'

import { ClassComponent } from './ClassComponent'
import { MessagesComp } from './MessagesComp'
import { NoResultsComp } from './NoResultsComp'
import { PagingComp } from './PagingComp'
import { ProgressComp } from './ProgressComp'
import { data } from '../data/data'
import { formatPrice } from '../util/NumberUtil'
import { get } from '../util/MithrilUtil'

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
					<ProgressComp />
					:
					[
						<MessagesComp _messages={data.search.messages}/>,
						(data.search.response ?
							(data.search.response.totalItems ?
								[
									(<p>Results: {data.search.response.totalItems}</p>),
									get(() => !!data.search.response.items.length) &&
									data.search.response.items.map(volume => (
										<div class="well">
											<h4>
												<a href={getVolumeDetailsPageLink(volume.id)}>
													{volume.volumeInfo.title}
												</a>
											</h4>
											<div>
												{get<m.Children>(() => m.trust(volume.searchInfo.textSnippet), () => m.trust(volume.volumeInfo.description))}
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
									)),
									(<PagingComp
										_value={data.search.page}
										_lastValue={Math.ceil(data.search.response.totalItems / 10)}
										_setter={setPage}
										_noLast={true /* Result count changes between pages, last page is informative only. */}
									/>)
								]
								:
								<NoResultsComp _message="No results." />
							)
							:
							<NoResultsComp _message="Specify a query to start searching." />
						)
					]
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