import * as m from 'mithril'

import { ResponseSearchVolumes } from '../data/ResponseSearchVolumes'
import { Volume } from '../data/Volume'
import { get } from '../util/MithrilUtil'

const BOOKS_API_KEY = 'AIzaSyDwAWEmy2ceP3gYWWtP3h2Ve0weiXZfY9k'

export function booksServerSearchByTitle(query: string, page: number, saveXhr?: (xhr: XMLHttpRequest) => any) {
	return m.request<ResponseSearchVolumes>({
		url: `https://www.googleapis.com/books/v1/volumes`,
		data: {
			q: `intitle:${query}`,
			startIndex: (page - 1) * 10,
			maxResults: 10,
			key: BOOKS_API_KEY,
		},
		config: saveXhr,
	})
}

export function booksServerGetVolume(volumeId: string, projection: 'full' | 'lite', saveXhr?: (xhr: XMLHttpRequest) => any) {
	return m.request<Volume>({
		url: `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(volumeId)}`,
		data: {
			projection,
			key: BOOKS_API_KEY,
		},
		config: saveXhr,
	})
}

export function handleXhrError(xhr: XMLHttpRequest, messages: string[], e: any) {
	messages.push(`Error while loading data: ${get(() => xhr.status)} ${get(() => xhr.statusText)} – ${e}. Check your connection and try again.`)
	console.error(e)
}