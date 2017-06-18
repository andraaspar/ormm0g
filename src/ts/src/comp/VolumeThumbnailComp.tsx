import * as m from 'mithril'

import { extendAttrs, get } from '../util/MithrilUtil'

import { ClassComponent } from './ClassComponent'
import { IAttributes } from '../util/IAttributes'
import { NoResultsComp } from './NoResultsComp'
import { Volume } from '../data/Volume'

export interface IVolumeThumbnailCompAttrs extends IAttributes {
	_volume: Volume
}

type Vnode = m.CVnode<IVolumeThumbnailCompAttrs>
type VnodeDOM = m.CVnodeDOM<IVolumeThumbnailCompAttrs>

export class VolumeThumbnailComp extends ClassComponent<IVolumeThumbnailCompAttrs> {

	// oninit(v: Vnode) {}
	// onbeforeupdate(v: Vnode, o: VnodeDOM) {}
	view(v: Vnode) {
		return (
			get(() => v.attrs._volume.volumeInfo.imageLinks.smallThumbnail) ?
				<img {...extendAttrs(v.attrs, {
					src: v.attrs._volume.volumeInfo.imageLinks.smallThumbnail,
					alt: `Cover image of ${v.attrs._volume.volumeInfo.title}`,
				}) } />
				:
				<NoResultsComp _message="Cover not found." />
		)
	}
	// oncreate(v: VnodeDOM) {}
	// onupdate(v: VnodeDOM) {}
	// onbeforeremove(v: VnodeDOM) {}
	// onremove(v: VnodeDOM) {}
}