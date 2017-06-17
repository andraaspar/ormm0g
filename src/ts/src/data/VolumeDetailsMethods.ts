import { booksServerGetVolume, handleXhrError } from '../server/BooksServer'

import { data } from './data'

export function abortVolumeDetailsRequest() {
	if (data.volumeDetails.xhr) {
		data.volumeDetails.xhr.abort()
		data.volumeDetails.xhr = undefined
	}
}

export function requestVolumeDetails() {
	abortVolumeDetailsRequest()
	data.volumeDetails.volume = undefined
	data.volumeDetails.messages = []
	booksServerGetVolume(data.volumeDetails.volumeId, xhr => data.volumeDetails.xhr = xhr)
		.then(volume => {
			data.volumeDetails.volume = volume
		})
		.catch(e => {
			handleXhrError(data.volumeDetails.xhr, data.volumeDetails.messages, e)
		})
		.then(() => {
			data.volumeDetails.xhr = undefined
		})
}