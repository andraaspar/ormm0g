
export class Volume {
	constructor(
		public kind: 'books#volume',
		public id: string,
		public etag: string,
		public selfLink: string,
		public volumeInfo: {
			title: string
			subtitle: string
			authors: string[]
			publisher: string
			publishedDate: string
			description: string
			imageLinks: {
				smallThumbnail: string
				thumbnail: string
				small: string
				medium: string
				large: string
				extraLarge: string
			}
		},
		public searchInfo: {
			textSnippet: string
		},
	) { }
}