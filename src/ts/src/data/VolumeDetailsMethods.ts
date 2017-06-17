import { booksServerGetVolume } from '../server/BooksServer'
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
	booksServerGetVolume(data.volumeDetails.volumeId, xhr => data.volumeDetails.xhr = xhr)
		.then(volume => {
			data.volumeDetails.volume = volume
		})
		.catch(e => {
			console.error(e)
			data.volumeDetails.messages.push(e)
		})
		.then(() => {
			data.volumeDetails.xhr = undefined
		})
}