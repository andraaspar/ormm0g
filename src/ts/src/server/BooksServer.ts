import * as m from 'mithril'

import { ResponseSearchVolumes } from '../data/ResponseSearchVolumes'

const BOOKS_API_KEY = 'AIzaSyDwAWEmy2ceP3gYWWtP3h2Ve0weiXZfY9k'

export function booksServerSearch(query: string, saveXhr?: (xhr: XMLHttpRequest) => any) {
	return m.request<ResponseSearchVolumes>({
		url: `https://www.googleapis.com/books/v1/volumes`,
		data: {
			q: query,
			key: BOOKS_API_KEY,
		},
		config: saveXhr,
	})
}