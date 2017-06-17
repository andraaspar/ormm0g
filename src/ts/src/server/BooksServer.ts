import * as m from 'mithril'

import { ResponseSearchVolumes } from '../data/ResponseSearchVolumes'

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