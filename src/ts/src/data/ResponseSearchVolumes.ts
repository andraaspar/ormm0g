import { Volume } from './Volume'

export class ResponseSearchVolumes {
	constructor(
		public kind: 'books#volumes',
		public items: Volume[],
		public totalItems: number,
	) { }
}