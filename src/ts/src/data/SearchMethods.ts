import { booksServerSearch } from '../server/BooksServer'
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
	if (data.search.query.length < 3) return
	booksServerSearch(data.search.query, xhr => data.search.xhr = xhr)
		.then(results => {
			data.search.response = results
		})
		.catch(e => {
			data.search.response = undefined
			data.search.messages.push(e + '')
		})
		.then(() => {
			data.search.xhr = undefined
		})
}