import { ResponseSearchVolumes } from './ResponseSearchVolumes'

export class SearchData {
	constructor(
		public query = '',
		public page = 1,
		public xhr?: XMLHttpRequest,
		public response?: ResponseSearchVolumes,
		public messages: string[] = [],
	) { }
}