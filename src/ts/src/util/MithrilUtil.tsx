import * as m from 'mithril'

import { isArray, isUndefinedOrNull } from 'illa/Type'

import assign from 'lodash/assign'
import { isFunction } from 'illa/Type'

export function get<T>(fn: T | (() => T), ...rest: (T | (() => T))[]): T {
	if (isFunction(fn)) {
		try {
			return fn()
		} catch (e) {
			return rest.length ? get.apply(null, rest) : undefined
		}
	} else {
		return fn
	}
}

export function nope(): never {
	throw 'nope'
}

export function classes(...a: any[]): string {
	return a.filter(item => !isUndefinedOrNull(item) && item !== false).map(item => isArray(item) ? classes(item) : item).join(` `)
}

export function extendAttrs(attrs2: { [_: string]: any }, attrs: { [_: string]: any }, keepUnderscores?: boolean) {
	let result: { [_: string]: any } = {}
	if (keepUnderscores) {
		assign(result, attrs2)
	} else {
		for (let key of Object.keys(attrs2)) {
			if (key[0] != '_') {
				result[key] = (attrs2 as any)[key]
			}
		}
	}
	result = assign(result, attrs)
	if (attrs2.class && attrs.class) result.class = `${attrs.class} ${attrs2.class}`
	return result
}