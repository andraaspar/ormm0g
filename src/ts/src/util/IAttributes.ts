import { TMithrilEvent } from './TMithrilEvent'

export interface IAttributes {
	id?: string
	class?: string
	style?: string | {[_: string]: any}
	type?: string
	title?: string
	disabled?: boolean
	value?: any
	placeholder?: string
	role?: string
	onclick?: (e: TMithrilEvent<MouseEvent>) => any
	oninput?: (e: TMithrilEvent<KeyboardEvent>) => any
	onkeydown?: (e: TMithrilEvent<KeyboardEvent>) => any
	onfocus?: (e: TMithrilEvent<FocusEvent>) => any
}