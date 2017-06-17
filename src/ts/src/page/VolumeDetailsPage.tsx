import * as m from 'mithril'

import { AppComp } from '../comp/AppComp'
import { ClassComponent } from '../comp/ClassComponent'
import { MessagesComp } from '../comp/MessagesComp'
import { NoResultsComp } from '../comp/NoResultsComp'
import { ProgressComp } from '../comp/ProgressComp'
import { data } from '../data/data'
import { formatPrice } from '../util/NumberUtil'
import { get } from '../util/MithrilUtil'
import { requestVolumeDetails } from '../data/VolumeDetailsMethods'

export interface IVolumeDetailsPageAttrs {
	volumeId: string
}

type Vnode = m.CVnode<IVolumeDetailsPageAttrs>
type VnodeDOM = m.CVnodeDOM<IVolumeDetailsPageAttrs>

export class VolumeDetailsPage extends ClassComponent<IVolumeDetailsPageAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		let volume = get(() => data.volumeDetails.volume)
		return (
			<AppComp>
				{
					(data.volumeDetails.xhr ?
						<ProgressComp />
						:
						[
							<MessagesComp _messages={data.volumeDetails.messages}/>,
							(volume ?
								<div class="row">
									<div class="col-sm-4 col-md-3 col-lg-2">
										{
											get(() => volume.volumeInfo.imageLinks.smallThumbnail) ?
												<div class="thumbnail">
													<img src={data.volumeDetails.volume.volumeInfo.imageLinks.smallThumbnail} alt={`Cover image of ${volume.volumeInfo.title}`} />
												</div>
												:
												<NoResultsComp _message="Cover not found." />
										}
									</div>
									<div class="col-sm-8 col-md-9 col-lg-10">
										<h2>
											{volume.volumeInfo.title}
											{volume.volumeInfo.subtitle &&
												<span>
													<br />
													<small>{volume.volumeInfo.subtitle}</small>
												</span>
											}
										</h2>
										{
											get(() => !!volume.volumeInfo.authors.length) &&
											<p>{volume.volumeInfo.authors.length > 1 ? `Authors` : `Author`}: {volume.volumeInfo.authors.join(', ')}</p>
										}
										<div>
											{get(() => m.trust(volume.volumeInfo.description))}
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
								:
								<NoResultsComp _message="Volume not found." />
							)
						]
					)
				}
			</AppComp>
		)
	}
	oncreate(v: VnodeDOM) {
		checkHash(v)
	}
	onupdate(v: VnodeDOM) {
		checkHash(v)
	}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}

function checkHash(v: Vnode) {
	if (data.noHashCheck) {
		data.noHashCheck = false
		return
	}
	let isChanged = v.attrs.volumeId != data.volumeDetails.volumeId
	data.volumeDetails.volumeId = v.attrs.volumeId
	if (isChanged) {
		requestVolumeDetails()
		// Mithril 1.1.1 issue: no redraw when called from oncreate
		setTimeout(() => m.redraw(), 0)
	}
}

