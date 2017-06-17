import { Volume } from './Volume'

export class VolumeDetailsData {
	constructor(
		public volumeId?: string,
		public volume?: Volume,
		public xhr?: XMLHttpRequest,
		public messages: string[] = [],
	) { }
}