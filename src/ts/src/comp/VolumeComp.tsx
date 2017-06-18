import * as m from 'mithril'

import { AddToCartButtonComp } from './AddToCartButtonComp'
import { ClassComponent } from './ClassComponent'
import { OptionalLinkComp } from './OptionalLinkComp'
import { ProgressComp } from './ProgressComp'
import { Volume } from '../data/Volume'
import { VolumeThumbnailComp } from './VolumeThumbnailComp'
import { get } from '../util/MithrilUtil'
import { getVolumeDetailsPageLink } from '../main'

export interface IVolumeCompAttrs {
	_volume: Volume
	_link?: boolean
}

type Vnode = m.CVnode<IVolumeCompAttrs>
type VnodeDOM = m.CVnodeDOM<IVolumeCompAttrs>

export class VolumeComp extends ClassComponent<IVolumeCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			<div class="row">
				<div class="col-sm-4 col-md-3 col-lg-2">
					<OptionalLinkComp _href={v.attrs._link ? getVolumeDetailsPageLink(get(() => v.attrs._volume.id)) : undefined}>
						<VolumeThumbnailComp class="img-responsive center-block img-thumbnail" _volume={v.attrs._volume} />
					</OptionalLinkComp>
				</div>
				<div class="col-sm-8 col-md-9 col-lg-10">
					{
						(get<m.Children>(() => v.attrs._volume.volumeInfo.title) ?
							<h2>
								<OptionalLinkComp _href={v.attrs._link ? getVolumeDetailsPageLink(get(() => v.attrs._volume.id)) : undefined}>
									{v.attrs._volume.volumeInfo.title}
									{v.attrs._volume.volumeInfo.subtitle &&
										<span>
											<br />
											<small>{v.attrs._volume.volumeInfo.subtitle}</small>
										</span>
									}
								</OptionalLinkComp>
							</h2>
							:
							<ProgressComp />
						)
					}
					{
						get(() => !!v.attrs._volume.volumeInfo.authors.length) &&
						<p>{v.attrs._volume.volumeInfo.authors.length > 1 ? `Authors` : `Author`}: {v.attrs._volume.volumeInfo.authors.join(', ')}</p>
					}
					<div>
						{get(() => m.trust(v.attrs._volume.volumeInfo.description))}
					</div>
					<br />
					<p>
						<AddToCartButtonComp _volume={v.attrs._volume} />
					</p>
				</div>
			</div>
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}