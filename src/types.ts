
export enum TypeEnum {
	HUB='HUB',
	COLLECTION='collection',
	VIEW='view'
}

type BaseInfoType = {
	_type: TypeEnum,
	id: string
}

type GroupInfoType = BaseInfoType & {
	href: string,
	name: string,
	theme: string,
	artwork: {
		[key: string] : ArtworkType
	},
}

type ArtworkType = {
	
	path: string,
	image_type?: string,
	image_id: string,
	accent: {
		[type: string]: any
	}
}

type BrowseType = {
	type: string,
	target_type: string,
	target_id: string,
	target_theme: string
	params: object
}

type ItemArtworkTileType = {
	_type:	string,
	artwork_type:	string,
	text: string,
	image: ArtworkType
}

type ItemArtworkType = {
	_type: string,
	horizontal_tile: ItemArtworkTileType,
	vertical_tile: ItemArtworkTileType,
}

type ItemMetaType = {
	genre_names?: string[],
	premiere_date?: string,
	rating: {
		code: string
	},
	series_description: string,
	entity_type: string,
	episode_text: string,
	is_warm: boolean
}

export type ItemType = {
	_type: string,
	id:	string,
	view_template: string,
	visuals: {
		artwork: ItemArtworkType,

		headline: string,
		body: string,
		action_text: string,
		subtitle: string,
		footer: string,
		prompt: string,

		primary_branding: {
			id: string,
			name: string,
			artwork: {
				[key: string]: ArtworkType
			}
		}
	}
	entity_metadata: ItemMetaType
}

export type CollectionType = GroupInfoType & {
	items: ItemType[]
}

export type HubRespType = GroupInfoType & {
	browse: BrowseType,
	components: CollectionType[]
}

export enum LevelEnum {
	WATERMARK='WATERMARK',
	S='S',
	M='M',
	L='L'
}

export enum CARD_IMG_SIZE_MAP_H {
	WATERMARK='60x40',
	S='200x120',
	M='400x240',
	L='800x480'
}

export enum CARD_IMG_SIZE_MAP_V {
	WATERMARK='40x60',
	S='140x200',
	M='280x400',
	L='560x800'
}

export enum ThemeTypeEnum {
	HORIZONTAL='HORIZONTAL',
	VERTICAL='VERTICAL'
}

export type SettingItemType = {
	selector: string,
	element: HTMLElement,
	onclick: () => void
}