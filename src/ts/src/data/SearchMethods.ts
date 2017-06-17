import { booksServerSearchByTitle, handleXhrError } from '../server/BooksServer'

import { data } from './data'
import debounce from 'lodash/debounce'

export function abortSearch() {
	if (data.search.xhr) {
		data.search.xhr.abort()
		data.search.xhr = undefined
	}
}

export function search() {
	abortSearch()
	data.search.response = undefined
	data.search.messages = []
	if (data.search.query.length < 3) return
	booksServerSearchByTitle(data.search.query, data.search.page, xhr => data.search.xhr = xhr)
		.then(results => {
			data.search.response = results
		})
		.catch(e => {
			handleXhrError(data.search.xhr, data.search.messages, e)
		})
		.then(() => {
			data.search.xhr = undefined
		})
}