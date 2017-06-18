import { CartData } from './CartData'
import { SearchData } from './SearchData'
import { VolumeDetailsData } from './VolumeDetailsData'

export const data = {
	search: new SearchData(),
	volumeDetails: new VolumeDetailsData(),
	noHashCheck: false,
	cart: new CartData(),
}