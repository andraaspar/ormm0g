import * as m from 'mithril'

import { AppComp } from '../comp/AppComp'
import { ClassComponent } from '../comp/ClassComponent'
import { MessagesComp } from '../comp/MessagesComp'
import { NoResultsComp } from '../comp/NoResultsComp'
import { ProgressComp } from '../comp/ProgressComp'
import { SITE_TITLE_SUFFIX } from '../main'
import { VolumeComp } from '../comp/VolumeComp'
import { data } from '../data/data'
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
								<VolumeComp _volume={volume}/>
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
	let title = get(() => data.volumeDetails.volume.volumeInfo.title)
	document.title = (title ? `Details of ‘${title}’` : 'Details of volume') + SITE_TITLE_SUFFIX
	
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

