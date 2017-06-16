import { ResponseSearchVolumes } from './ResponseSearchVolumes'

export class SearchData {
	constructor(
		public query = '',
		public xhr?: XMLHttpRequest,
		public response?: ResponseSearchVolumes,
		public messages: string[] = [],
	) { }
}